<?php

namespace App\Http\Controllers;

use App\Events\FriendDelete;
use App\Events\FriendReqAccept;
use App\Events\FriendReqDelete;
use App\Events\FriendReqSent;
use App\Events\FriendRequestSent;
use App\Models\Chat;
use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class friendController extends Controller
{

    public function getFriends(Request $request){
        $user = $request->user();
        $skip = $request->input('skip', 0);
        $take = $request->input('take', 10);

       
$friendCondition = function ($query) use ($user) {
    $query->where('userone', $user->id)
          ->orWhere('usertwo', $user->id);
};

$friends = $user->friends()
    ->where('status', 'confirmed') 
    ->where($friendCondition) 
    ->orderBy('updated_at', 'desc') 
    ->skip($skip)
    ->take($take)
    ->get();

        $friends = $friends->map(function ($f) use ($request){
            if($f -> userone == $request->user() -> id){
                $friend = User::find($f->usertwo);
            }else{
                $friend = User::find($f->userone);
            }
            $friend->created_at = $f->created_at;
            $friend->updated_at = $f->updated_at;
            $friend->profile_image = url('/assets/images/' . $friend->profile_image);
            return $friend;
        });

        return [
            'friends' => $friends,
        ];
    }

    public function getFriendsRequests(Request $request){
        $user = $request->user();
        $skip = $request->input('skip', 0);
        $take = $request->input('take', 10);

        $requests = $user->friends()
    ->where('status', 'pending')
    ->where('usertwo', $user->id)
    ->orderBy('updated_at', 'desc') 
    ->skip($skip)
    ->take($take)
    ->get();



        $requests = $requests->map(function ($r) use ($request) {
            $friend = User::find($r->userone);
            if ($friend) {
                $friend->profile_image = url('/assets/images/' . $friend->profile_image);
                $friend->created_at = $r->created_at;
            $friend->updated_at = $r->updated_at;
            }
            return $friend;
        });
        return [
            'requests' => $requests,
        ];
    }

    public function createFriend(Request $request)
    {
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);
    
        $user = $request->user();
    
        if ($user->id == $request->friend_id) {
            return response()->json(['message' => 'Cannot send a friend request to yourself.'], 400);
        }
    
        // Check for the first condition (userone and usertwo)
$existingFriendCondition1 = Friend::where([
    ['userone', '=', $user->id],
    ['usertwo', '=', $request->friend_id],
])->first();

// Check for the second condition (userone and usertwo swapped)
$existingFriendCondition2 = Friend::where([
    ['userone', '=', $request->friend_id],
    ['usertwo', '=', $user->id],
])->first();

// Combine the results of both conditions
$existingFriend = $existingFriendCondition1 ?? $existingFriendCondition2;

 
        if ($existingFriend) {
            if ($existingFriend->status === 'pending') {
                return response()->json(['message' => 'Friend request already sent.'], 400);
            } elseif ($existingFriend->status === 'confirmed') {
                return response()->json(['message' => 'You are already friends with this user.'], 400);
            }
        }
    

        $friend = new Friend([
            'userone' => $user->id,
            'usertwo' => $request->friend_id,
            'status' => 'pending',
        ]);
    
        $friend->save();

        $data =  [
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_image' => url('/assets/images/' . $request->user()->profile_image),
            'bio' => $request->user()->bio,
            'email_verified_at' => $request->user()->email_verified_at,
            'created_at' => $friend->created_at,
            'updated_at' => $friend->updated_at,
        ];




        event(new FriendReqSent($data, $request->friend_id));
        return response()->json([
            'friend' => $friend,
            'message' => 'Friend request sent successfully!',
        ], 201);
    }
    



    public function deleteReq(Request $request){
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);

        $user = $request->user();

        $friend = Friend::where([
            ['userone', '=', $user->id],
            ['usertwo', '=', $request->friend_id],
            ['status', '=', 'pending'],
        ])->first();

        if (!$friend) {
            return response()->json(['message' => 'Friend request not found.'], 404);
        }
        $data =  [
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_image' => url( '/assets/images/' . $request->user()->profile_image),
            'bio' => $request->user()->bio,
            'email_verified_at' => $request->user()->email_verified_at,
            'created_at' => $friend->created_at,
            'updated_at' => $friend->updated_at,
        ];
        event(new FriendReqDelete($data, $request->friend_id));
        $friend->delete();
        return [
           'message' => 'Friend request deleted successfully!',
        ];
    }
    public function rejectReq(Request $request){
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);

        $user = $request->user();

        $friend = Friend::where([
            ['userone', '=', $request->friend_id],
            ['usertwo', '=', $user->id],
            ['status', '=', 'pending'],
        ])->first();

        if (!$friend) {
            return response()->json(['message' => 'Friend request not found.'], 404);
        }
        $friend->delete();
        return [
           'message' => 'Friend request rejected successfully!',
        ];
    }
    public function acceptReq(Request $request){
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);

        $otherUser = User::find($request->friend_id);


        

        $user = $request->user();

        $friend = Friend::where([
            ['userone', '=', $request->friend_id],
            ['usertwo', '=', $user->id],
            ['status', '=', 'pending'],
        ])->first();

        if (!$friend) {
            return response()->json(['message' => 'Friend request not found.'], 404);
        }

        $friend->status = 'confirmed';
        $friend->save();


        $data =  [
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_image' => url( '/assets/images/' . $request->user()->profile_image),
            'bio' => $request->user()->bio,
            'email_verified_at' => $request->user()->email_verified_at,
            'created_at' => $friend->created_at,
            'updated_at' => $friend->updated_at,
        ];


        $userChats = $user->chats()->select('chats.id')->pluck('id');
        $otherUserChats = $otherUser->chats()->select('chats.id')->pluck('id');

        $commonChats = $userChats->intersect($otherUserChats);

        if($commonChats->count() > 0){
            $chat = Chat::find($commonChats->first());
$chat->users()
->wherePivot('user_id', $request->friend_id)
->wherePivot('status', 'archived')
->updateExistingPivot($request->friend_id, ['status' => 'active']);


$chat->users()
->wherePivot('user_id', $user->id)
->wherePivot('status', 'archived')
->updateExistingPivot($user->id, ['status' => 'active']);

        }else{
            $chat = $user->chats()->create();
            $chat->users()->attach($request->friend_id);
        }

    


        

      
        event(new FriendReqAccept($data, $request->friend_id, $chat->id));

        
        return [
           'message' => 'Friend request rejected successfully!',
        ];
    }
    public function removeFriend(Request $request){
        $request->validate([
            'friend_id' => 'required|exists:users,id',
        ]);

        $user = $request->user();
        $otherUser = User::find($request->friend_id);



        $friendCondition1 = Friend::where([
            ['userone', '=', $request->friend_id],
            ['usertwo', '=', $user->id],
            ['status', '=', 'confirmed'],
        ])->first();
        
        $friendCondition2 = Friend::where([
            ['userone', '=', $user->id],
            ['usertwo', '=', $request->friend_id],
            ['status', '=', 'confirmed'],
        ])->first();

        
        $friend = $friendCondition1 ?? $friendCondition2;

        if (!$friend) {
            return response()->json(['message' => 'This User isnt your friend'], 405);
        }


        $data =  [
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_image' => url('/assets/images/' . $request->user()->profile_image),
            'bio' => $request->user()->bio,
            'email_verified_at' => $request->user()->email_verified_at,
            'created_at' => $friend->created_at,
            'updated_at' => $friend->updated_at,
        ];

        $userChats = $user->chats()->pluck('chats.id');
$otherUserChats = $otherUser->chats()->pluck('chats.id');
$commonChats = $userChats->intersect($otherUserChats);

if ($commonChats->isNotEmpty()) {
    $chat = Chat::find($commonChats->first());

    $archivedForAllUsers = $chat->users->every(function ($chatUser) {
        return $chatUser->pivot->status === 'archived';
    });

    if ($archivedForAllUsers) {
        $chat->delete();
    }
}

        event(new FriendDelete($data, $request->friend_id, $chat->id, $archivedForAllUsers));

        $friend->delete();

        return [
           'message' => 'Friend deleted successfully!',
        ];
    }
}
