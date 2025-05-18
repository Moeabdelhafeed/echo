<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request){
        return [
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'profile_image' => url('/assets/images/' . $request->user()->profile_image),
            'bio' => $request->user()->bio,
            'email_verified_at' => $request->user()->email_verified_at,
            'created_at' => $request->user()->created_at,
            'updated_at' => $request->user()->updated_at,
        ];
    }

    public function getUser(Request $request, string $id){
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $pending = $request->user()->friends()
        ->where([
            ['status', 'pending'],
            ['usertwo', $user->id]
        ])->exists();

        $hePending = $request->user()->friends()
        ->where([
            ['status', 'pending'],
            ['userone', $user->id]
        ])->exists();
        

        $friendUserOne = Friend::where([
            ['status', '=', 'confirmed'],
            ['userone', '=', $request->user()->id],
            ['usertwo', '=', $user->id],
        ])->exists();
        
        
        $friendUserTwo = Friend::where([
            ['status', '=', 'confirmed'],
            ['usertwo', '=', $request->user()->id],
            ['userone', '=', $user->id],
        ])->exists();
        
    
        $friend = $friendUserOne || $friendUserTwo;

        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'pending' => $pending,
            'friend' => $friend,
            'hePending' => $hePending,
            'profile_image' => url('/assets/images/' . $user->profile_image),
            'bio' => $user->bio,
        ];

    }

    public function getUsers(Request $request){
        $user = $request->user();
        $search = $request->input('search');
        $skip = $request->input('skip', 0);
        $take = $request->input('take', 10);
    
        $users = User::query()
            ->where('name', 'LIKE', "%{$search}%")
            ->where('id', '!=', $request->user()->id) 
            ->skip($skip)
            ->take($take) 
            ->get();
    
        $usersWithTheImage = $users->map(function ($user) use ($request){
            $user->profile_image = url('/assets/images/' . $user->profile_image);
        
            return $user;
        });
        return response()->json($usersWithTheImage);

    }
}
