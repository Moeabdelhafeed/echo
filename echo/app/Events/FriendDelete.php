<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FriendDelete implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $sender;
    public $receiver;
    public $chatId;
    public $shouldDelete;


    public function __construct($sender, $receiver, $chatId, $shouldDelete)
    {
        $this->sender = $sender;
        $this->receiver = $receiver;
        $this->chatId = $chatId;
        $this->shouldDelete = $shouldDelete;

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
        return 'friend.delete';
    }

    public function broadcastWith(): array
    {
        if ($this->shouldDelete) {
            return [
                'sender' => $this->sender,
                'chatId' => $this->chatId,
                
            ];
        }else{
            return [
                'sender' => $this->sender,
                
            ];
        }
    }
}
