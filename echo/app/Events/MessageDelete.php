<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageDelete implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $receiver;
    public $message;
    public $chat;
    public $wasDeleted;


    public function __construct($message, $receiver, $chat, $wasDeleted)
    {
        $this->message = $message;
        $this->receiver = $receiver;
        $this->chat = $chat;
        $this->wasDeleted = $wasDeleted;
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
        return 'message.delete';
    }

    public function broadcastWith(): array
    {
        return [
            'message' => $this->message,
            'updated_at' => $this->chat->updated_at,
            'was_deleted' => $this->wasDeleted,

        ];
    }
}
