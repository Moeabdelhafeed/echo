<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\friendController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Mail\TestEmail;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;




Route::post('/chats', [MessageController::class, 'getChats'])->middleware('auth:sanctum');
Route::get('/user', [UserController::class, 'user'])->middleware('auth:sanctum');
Route::get('/user/{id}', [UserController::class, 'getUser'])->middleware('auth:sanctum');

Route::post('/chat', [MessageController::class, 'getChat'])->middleware('auth:sanctum');
Route::delete('/chat/delete', [MessageController::class, 'deleteChat'])->middleware('auth:sanctum');

Route::post('/searchusers' , [UserController::class, 'getUsers'])->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::post('/profile/editprofile', [ProfileController::class, 'edit'])->middleware('auth:sanctum');
Route::post('/profile/setimage', [ProfileController::class, 'setImage'])->middleware('auth:sanctum');

Route::delete('/profile/removeimage', [ProfileController::class, 'removeImage'])->middleware('auth:sanctum');

Route::post('/friends/requests', [friendController::class, 'getFriendsRequests'])->middleware('auth:sanctum');

Route::post('/friends', [friendController::class, 'getFriends'])->middleware('auth:sanctum');
Route::post('/friends/create', [friendController::class, 'createFriend'])->middleware('auth:sanctum');


Route::delete('/friends/requests/delete', [friendController::class, 'deleteReq'])->middleware('auth:sanctum');
Route::delete('/friends/requests/reject', [friendController::class, 'rejectReq'])->middleware('auth:sanctum');

Route::post('/friends/requests/accept', [friendController::class, 'acceptReq'])->middleware('auth:sanctum');
Route::delete('/friends/remove', [friendController::class, 'removeFriend'])->middleware('auth:sanctum');

Route::post('/messages' , [MessageController::class, 'getMessages'])->middleware('auth:sanctum');
Route::post('/messages/send', [MessageController::class,'sendMessage'])->middleware('auth:sanctum');

Route::post('/messages/typing', [MessageController::class,'typing'])->middleware('auth:sanctum');
Route::post('/messages/nottyping', [MessageController::class,'notTyping'])->middleware('auth:sanctum');

Route::delete('/messages/delete', [MessageController::class,'deleteMessage'])->middleware('auth:sanctum');
Route::post('/messages/lastmessage', [MessageController::class,'lastMessage'])->middleware('auth:sanctum');

Route::post('/messages/seen', [MessageController::class,'seenMessage'])->middleware('auth:sanctum');



