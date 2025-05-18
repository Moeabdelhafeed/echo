<?php

namespace App\Http\Controllers;

use App\Events\MessageDelete;
use App\Events\MessageSent;
use App\Events\MessagesSeen;
use App\Events\NotTyping;
use App\Events\Typing;
use App\Models\Chat;
use App\Models\Friend;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\DB;

use function PHPSTORM_META\map;

class MessageController extends Controller
{

    public function typing(Request $request){
        $user = $request->user();
        $friendId = $request->input('friend_id');
        $chatId = $request->input('chat_id');

        broadcast( new Typing($user, $friendId, $chatId )); 
    }

    public function notTyping(Request $request){
        $user = $request->user();
        $friendId = $request->input('friend_id');
        $chatId = $request->input('chat_id');

        broadcast( new NotTyping($user, $friendId, $chatId));
    }
    public function getChats(Request $request){
        $user = $request->user();
        $skip = $request->input('skip', 0);
        $take = $request->input('take', 10);
        $count = 0;

        

        $chats = $user->chats()
            ->orderBy('updated_at', 'desc')
            ->skip($skip)
            ->take($take)
            ->get();

            $chats->each(function ($chat) use ($user, $count) {
                $otherUser = $chat->users()->where('user_id', '!=', $user->id)->first();

                $chat->users = $chat->users()->where('user_id', '!=', $user->id)->get();
                $chat->users->each(function ($u) {
                    $u->profile_image = url('/assets/images/' . $u->profile_image);
                });
                $chat->is_archived = $chat->users()->where('user_id', '=', $user->id)->wherePivot('status', 'archived')->exists();

                $updatedAt = $chat->users()->wherePivot('user_id', $user->id)->first()->pivot->updated_at;

                 $updatedAt = Carbon::parse($updatedAt);

                 $chat->last_message = $chat->messages()
                 ->where('created_at', '>', $updatedAt)
                 ->latest('id')
                 ->first();
                 $chat->is_typing = false;

                 $chat->count_unseen = $chat->messages()->where('seen', 0)->where('user_id', '!=', $user->id)->where('created_at' , '>' , $updatedAt)->count();
                 $chat->is_seen = $chat->count_unseen > 0 ? true : false;
                 

            });

            

        return [
            'chats' => $chats,
        ];
    }

    public function getChat(Request $request){
        $user = $request->user();
        $chatId = $request->input('chat_id');
        $chat = $user->chats()->find($chatId);
        $otherUser = $chat->users()->where('user_id', '!=', $user->id)->first();

        if(!$chat){
            return response()->json([
                'errors' => [
                    'chat' => [
                        'Chat not found'
                    ]
                ]
            ], 404);
        }

        $existingFriendCondition1 = Friend::where([
            ['userone', '=', $user->id],
            ['usertwo', '=', $otherUser->id],
            ['status', '=', 'confirmed'],
        ])->first();
        
        // Check for the second condition (userone and usertwo swapped)
        $existingFriendCondition2 = Friend::where([
            ['userone', '=', $otherUser->id],
            ['usertwo', '=', $user->id],
            ['status', '=', 'confirmed'],
        ])->first();
        
        // Combine the results of both conditions
        $existingFriend = $existingFriendCondition1 ?? $existingFriendCondition2;

        $chat->is_friend = $existingFriend;

        $chat->is_archived = $chat->users()->where('user_id', '=', $user->id)
        ->wherePivot('status', 'archived')
        ->exists();

        $chat->is_typing = false;
        $chat->last_message = $chat->messages()
        ->latest('id')
        ->first();

        

        $chat->users = $chat->users()->get();
        $chat->users->each(function ($u) {
            $u->profile_image = url('/assets/images/' . $u->profile_image);
        });

        


        return [
            'chat' => $chat,
        ];
    }
    public function deleteChat(Request $request)
    {
        $user = $request->user();
        $chatId = $request->input('chat_id');
        $chat = $user->chats()->find($chatId);
    
        if (!$chat) {
            return response()->json([
                'errors' => [
                    'chat' => ['Chat not found'],
                ],
            ], 404);
        }
    
        $otherUser = $chat->users()->where('user_id', '!=', $user->id)->first();
    
        if (!$otherUser) {
            return response()->json([
                'errors' => [
                    'chat' => ['Invalid chat structure'],
                ],
            ], 400);
        }
    
        // Check if already archived for the user
        $isArchived = $chat->users()
            ->where('user_id', $user->id)
            ->wherePivot('status', 'archived')
            ->exists();
    
        if ($isArchived) {
            return response()->json([
                'errors' => [
                    'chat' => ['Chat already deleted'],
                ],
            ], 403);
        }
    
        // Archive chat for the current user
        $chat->users()->updateExistingPivot($user->id, ['status' => 'archived']);
    
        // Check if the other user has archived the chat and no friendship exists
        $otherUserArchived = $chat->users()
            ->where('user_id', $otherUser->id)
            ->wherePivot('status', 'archived')
            ->exists();
    
        $conditionOne = $user->friends()->where([
            ['userone', '=', $otherUser->id],
            ['status', '=', 'confirmed'],
        ])->exists();

        $conditionTwo = $user->friends()->where([
            ['usertwo', '=', $otherUser->id],
            ['status', '=', 'confirmed'],
        ])->exists();

        $isThereFriend = $conditionOne || $conditionTwo;


    
        if ($otherUserArchived && !$isThereFriend) {
            $chat->delete();
        }

        if($otherUserArchived){
            $chat->messages()->delete();
        }
    
        return response()->json([
            'message' => 'Chat deleted successfully',
        ]);
    }

public function getMessages(Request $request){
    $request->validate(
        [
            'chat_id' => 'required|exists:chats,id',
            'skip' => 'integer|min:0',
            'take' => 'integer|min:1|max:50',
        ]
    );

    $user = $request->user();
    $chatId = $request->input('chat_id');
    $skip = $request->input('skip', 0);
    $take = $request->input('take', 30);

    $chat = $user->chats()->find($chatId);

    if (!$chat) {
        return response()->json([
            'errors' => [
                'chat' => [
                    'Chat not found'
                ]
            ]
        ], 404);
    }

    // Get the user's updated_at from the pivot table
    $updatedAt = $chat->users()->wherePivot('user_id', $user->id)->first()->pivot->updated_at;

    // Convert updated_at to a Carbon instance if not already
    $updatedAt = Carbon::parse($updatedAt);

    // Get messages where created_at is greater than the user's updated_at
    $messages = $chat->messages()
    ->where('created_at', '>', $updatedAt)
    ->orderBy('created_at', 'desc') // Get the latest first
    ->skip($skip)
    ->take($take)
    ->get()
    ->reverse() // Reverse after fetching to maintain ascending order
    ->values();


    $messages->each(function ($message) {
        $message->sender = $message->user()->first();
        $message->sender->profile_image = url('/assets/images/' . $message->sender->profile_image);
        $message->reply_to = Message::find($message->replied_message_id);
    });
    

    return [
        'messages' => $messages,
        'updated_at' => $updatedAt
    ];
}


    public function sendMessage(Request $request){
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'message' => 'required|string',
            'replyed_to' => 'exists:messages,id'
        ]);

        $user = $request->user();
        $chatId = $request->input('chat_id');
        $message = $request->input('message');
        $replyedTo = $request->input('replyed_to');
        $messageWas = '';
      

        $chat = $user->chats()->find($chatId);

        $otherUser = $chat->users()->wherePivot('user_id', '!=', $user->id)->first();

        if(!$chat){
            return response()->json([
                'errors' => [
                    'chat' => [
                        'Chat not found'
                    ]
                ]
            ], 404);
        }

        $existingFriendCondition1 = Friend::where([
            ['userone', '=', $user->id],
            ['usertwo', '=', $otherUser->id],
            ['status', '=', 'confirmed'],
        ])->first();
        
        // Check for the second condition (userone and usertwo swapped)
        $existingFriendCondition2 = Friend::where([
            ['userone', '=', $otherUser->id],
            ['usertwo', '=', $user->id],
            ['status', '=', 'confirmed'],
        ])->first();
        
        // Combine the results of both conditions
        $existingFriend = $existingFriendCondition1 ?? $existingFriendCondition2;

        if(!$existingFriend){
            return response()->json([
                'errors' => [
                    'friendship' => [
                        'No friendship found'
                    ]
                ]
            ], 404);
        }

        


        $archivedUsers = $chat->users()->wherePivot('status', 'archived')->get();

        $senderArchived = $archivedUsers->contains('id', $user->id);
        $receiverArchived = $archivedUsers->contains('id', $otherUser->id);

if ($senderArchived && $receiverArchived) {
    $messageWas = 'yes';
} elseif ($senderArchived) {
    $messageWas = 'sender';
} elseif ($receiverArchived) {
    $messageWas = 'receiver';
} else {
    $messageWas = 'no';
}


foreach ($archivedUsers as $archivedUser) { 
    $chat->users()->updateExistingPivot($archivedUser->id, [
        'status' => 'active',
        'updated_at' => Carbon::now(),
    ]);
}


        

        

        $delayedTimestamp = Carbon::now()->addMilliseconds(1000);

        DB::table('messages')->insert([
            'user_id'    => $user->id,
            'chat_id'    => $chatId,
            'content'    => $message,
            'created_at' => $delayedTimestamp,
            'updated_at' => $delayedTimestamp,
            'was_deleted' => $messageWas,
            'replied_message_id' => $replyedTo ?:null,
        ]);

        $message = Message::where('user_id', $user->id)
        ->where('chat_id', $chatId)
        ->latest('id')
        ->first();

        $updatedAt = $chat->users()
    ->wherePivot('user_id', $otherUser->id) // Get `updated_at` for user two
    ->first()
    ->pivot
    ->updated_at;

$updatedAt = Carbon::parse($updatedAt); // Convert to Carbon instance

$count_unseen = $chat->messages()
    ->where('seen', 0) // Only unseen messages
    ->where('user_id', $user->id) // Only messages from user one (sender)
    ->where('created_at', '>', $updatedAt) // Messages after user two's last activity
    ->count();



        broadcast(new MessageSent($message, $otherUser->id, $chat->id, $count_unseen ));

        $chat->touch();

        $message->sender = $message->user()->first();
        $message->reply_to = Message::find($message->replied_message_id);

        $users = $chat->users()->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_image' => url('http://127.0.0.1:8000/assets/images/' . $user->profile_image),
                'pivot' => [
                    'status' => $user->pivot->status,
                    'created_at' => $user->pivot->created_at,
                    'updated_at' => $user->pivot->updated_at,
                ],
            ];
        });
            return [
            
                'message' => $message,
                'chat' => [
                    'id' => $chat->id,
                'updated_at' => $chat->updated_at,
                'users' => $users,
                'is_archived' => false,
                ],
            ];
       
    }

    public function seenMessage(Request $request) {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
            'message_id' => 'required|array|min:1', // Ensure message_id is an array
            'message_id.*' => 'required|exists:messages,id', // Validate each ID in the array
        ]);
    
        $user = $request->user();
        $chatId = $request->input('chat_id');
        $messageIds = $request->input('message_id');
        
        // Ensure user has access to this chat
        $chat = $user->chats()->find($chatId);
        $otherUser = $chat->users()->wherePivot('user_id', '!=', $user->id)->first();
        
        
        if (!$chat) {
            return response()->json([
                'errors' => ['chat' => ['Chat not found']]
            ], 404);
        }
    
        // Get messages belonging to the chat
        $messages = $chat->messages()->whereIn('id', $messageIds)->get();
    
        if ($messages->isEmpty()) {
            return response()->json([
                'errors' => ['message' => ['Messages not found']]
            ], 404);
        }
    
        // Mark messages as seen only if they belong to another user
        foreach ($messages as $message) {
            if ($message->user_id != $user->id) {
                $message->seen = true;
                $message->save();
            }
        }

        $lastMessage = $chat->messages()
        ->latest('id')
        ->first();

        broadcast(new MessagesSeen($otherUser->id, $lastMessage));
    
        return response()->json([
            'success' => true,
            'message' => 'Messages marked as seen'
        ]);
    }
    
    public function deleteMessage(Request $request){
        $request->validate([
            'chat_id' =>'required|exists:chats,id',
           'message_id' =>'required|exists:messages,id',
        ]);

        $user = $request->user();
        $chatId = $request->input('chat_id');
        $messageId = $request->input('message_id');
        
        $chat = $user->chats()->find($chatId);
        $otherUser = $chat->users()->wherePivot('user_id', '!=', $user->id)->first();

        if (!$chat) {
            return response()->json([
                'errors' => [
                    'chat' => [
                        'Chat not found'
                    ]
                ]
            ], 404);
        }

        $message = $chat->messages()->find($messageId);

        if (!$message) {
            return response()->json([
                'errors' => [
                   'message' => [
                        'Message not found'
                    ]
                ]
            ], 404);
        }

        if($message->user_id == $user->id){

            $userUpdatedAt = $chat->users()
    ->wherePivot('user_id', $user->id) // Get `updated_at` for user two
    ->first()
    ->pivot
    ->updated_at;
            $otherUserUpdatedAt = $chat->users()
    ->wherePivot('user_id', $otherUser->id) // Get `updated_at` for user two
    ->first()
    ->pivot
    ->updated_at;

    $wasDeletedReciever = false;
                    $wasDeletedUser = false;
            
            

                if($message->was_deleted == 'sender' && $chat->messages()->where('created_at', '>' , $userUpdatedAt)->count() == 1
                &&   $chat->messages()->where('created_at', '>', $userUpdatedAt)->first()->id === $message->id
                ){
                    $wasDeletedUser = true;
                   
                    $chat->users()->updateExistingPivot($user->id, [
                        'status' => 'archived',
                    ]);
                }else if($message->was_deleted == 'receiver' && $chat->messages()->where('created_at', '>' , $otherUserUpdatedAt)->count() == 1
                &&  $chat->messages()->where('created_at', '>', $otherUserUpdatedAt)->first()->id === $message->id
                
                ){
                    $wasDeletedReciever = true;
                  
                    $chat->users()->updateExistingPivot($otherUser->id, [
                        'status' => 'archived',
                    ]);
                }else if($message->was_deleted == 'yes' && $chat->messages()->count() == 1){
                    $wasDeletedUser = true;
                    $wasDeletedReciever = true;
    
                    $chat->users()->updateExistingPivot($user->id, [
                        'status' => 'archived',
                    ]);
                   
                    $chat->users()->updateExistingPivot($otherUser->id, [
                        'status' => 'archived',
                    ]);
                }
           



            $wasDeleted = $message->was_deleted;  // Save the 'was_deleted' value of the deleted message

        $message->delete();

        $nextMessage = $chat->messages()
            ->where('created_at', '>', $message->created_at)  // Get the next message based on the creation timestamp
            ->orderBy('created_at', 'asc')  // Order by creation time ascending to get the next one
            ->first();

        // If there is a next message, update its 'was_deleted' value
        if ($nextMessage) {
            $nextMessage->was_deleted = $wasDeleted; // Set the 'was_deleted' value to the same as the deleted message
            $nextMessage->save();
        }

        // Get the latest message from the chat after the delete operation
        $latestMessage = $chat->messages()
            ->orderBy('created_at', 'desc')
            ->first();



        // If there is a latest message, update its 'was_deleted' value
        if ($latestMessage) {
            $latestMessage->save();
        }


                    

                // Update chat's `updated_at` field with the latest message timestamp
                    $chat->updated_at = $latestMessage ? $latestMessage->created_at : $chat->created_at;
                    $chat->save();
                    $chat->is_typing = false;

                    broadcast(new MessageDelete($message->toArray(), $otherUser->id, $chat, $wasDeletedReciever));

                }else{
                    return response()->json([
                        'errors' => [
                        'message' => [
                                'You are not authorized to delete this message'
                            ]
                        ]
                    ], 403);
                }

                return response()->json([
                'message' => 'Message deleted successfully',
                'updated_at' => $chat->updated_at ,
                'was_deleted' => $wasDeletedUser,
                ]);

    }

    public function lastMessage(Request $request) {
        $request->validate([
            'chat_id' => 'required|exists:chats,id',
        ]);
    
        $user = $request->user();
        $chatId = $request->input('chat_id');
    
        $chat = $user->chats()->find($chatId);
    
        if (!$chat) {
            return response()->json([
                'errors' => [
                    'chat' => ['Chat not found'],
                ]
            ], 404);
        }
    
        // Get the other user (receiver)
        $otherUser = $chat->users()->where('user_id', '!=', $user->id)->first();
    
        if (!$otherUser) {
            return response()->json([
                'message' => '',
            ]);
        }
    
        // Get receiver's last activity in the chat
        $receiverUpdatedAt = $chat->users()
            ->wherePivot('user_id', $user->id)
            ->first()
            ->pivot
            ->updated_at;
    
        $receiverUpdatedAt = Carbon::parse($receiverUpdatedAt); // Convert to Carbon instance
    
        // Fetch the last message created AFTER receiver's updated_at
        $lastMessage = $chat->messages()
            ->latest('id')
            ->first();

        if($lastMessage){
            if($lastMessage->created_at > $receiverUpdatedAt){
                
                    return response()->json([
                        'message' => $lastMessage,
                        'receiver_updated_at' => $receiverUpdatedAt,
                    ]);
    
            }else{
                return response()->json([
                   'message' => '',
                   'receiver_updated_at' => $receiverUpdatedAt,
                ]);
            }
        }else{
            return response()->json([
               'message' => '',
               'receiver_updated_at' => $receiverUpdatedAt,
            ]);
        }


    }
    
}
