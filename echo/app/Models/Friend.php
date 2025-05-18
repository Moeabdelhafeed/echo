<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    protected $fillable = ['userone', 'usertwo', 'status'];

    public function userOne(){
        return $this->belongsTo(User::class, 'userone');
    }

    public function userTwo(){
        return $this->belongsTo(User::class, 'usertwo');
    }
}
