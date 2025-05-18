<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotTyping implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $receiver;
    public $chatId;

    /**
     * Create a new event instance.
     */
    public function __construct( $sender, $receiver, $chatId)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->chatId = $chatId;
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
        return 'typing.not';
    }

    public function broadcastWith(): array
    {
        return [
            'sender' => $this->sender,
            'chat_id' => $this->chatId,
        ];
    }
}