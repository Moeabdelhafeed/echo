<?php

namespace App\Events;

use App\Models\Chat;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $message;
    public $chat;
    public $countUnseen;


    public function __construct($message, $receiver, $chatId, $countUnseen)
    {
        $this->message = $message;
        $this->receiver = $receiver;
        $this->chat = Chat::find($chatId);
        $this->countUnseen = $countUnseen;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('user.' . $this->receiver),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    public function broadcastWith(): array
    {
        // Get the latest `updated_at` timestamp of the other user in the chat
        $updatedAt = $this->chat->users()
            ->wherePivot('user_id', '!=', $this->receiver) // Get the other participant
            ->first()
            ->pivot
            ->updated_at ?? null;
    
        // Convert `updated_at` to a Carbon instance if it exists
        $updatedAt = $updatedAt ? Carbon::parse($updatedAt) : null;
    
        // Attach sender information
        $this->message->sender = $this->message->user()->first();
        $this->message->sender->profile_image = url('http://127.0.0.1:8000/assets/images/' . $this->message->sender->profile_image);
        $this->message->reply_to = Message::find($this->message->replied_message_id);
    
        // Filter users to exclude the receiver
        $users = $this->chat->users()
            ->get()
            ->filter(fn($user) => $user->id != $this->receiver) // Only keep users who are NOT the receiver
            ->map(function ($user) {
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
            })
            ->values(); // Reset array indexes
    
        
    
        return [
            'message' => $this->message,
            'chat' => [
                'id' => $this->chat->id,
                'updated_at' => $this->chat->updated_at,
                'users' => $users, // Now correctly filtered
                'last_message' => $this->message,
                'is_archived' => false,
                'count_unseen' => $this->countUnseen,
                'is_typing' => false,
            ],
        ];
    }
}