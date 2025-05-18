<?php

namespace App\Events;

use App\Models\Chat;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendReqAccept implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $receiver;
    public $chat;

    public function __construct($sender, $receiver, $chatId)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->chat = Chat::find($chatId);
    }

    /**
     * Get the channels the event should broadcast on.
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->receiver),
        ];
    }

    public function broadcastAs(): string
    {
        return 'friend.req.accept';
    }

    public function broadcastWith(): array
    {
        // Attach users to the chat with the required formatting, including pivot 'status'
        $users = $this->chat->users()->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'profile_image' => url( '/assets/images/' . $user->profile_image),
                'pivot' => [
                    'status' => $user->pivot->status,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->pivot->updated_at,
                ],
            ];
        });
    
        return [
            'sender' => $this->sender,
            'chat' => [
               'id' => $this->chat->id,
                'updated_at' => $this->chat->updated_at,
                'users' => $users, // Now correctly filtered
                'last_message' => '',
                'is_archived' => false,
                'count_unseen' => 0,
                'is_typing' => false,
                
            ],
        ];
    }
    
}
