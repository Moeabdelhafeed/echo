<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('status')->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
