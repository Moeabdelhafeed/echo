<?php

use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;



Broadcast::channel('user.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
