<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\UpdateProfileController;
use Illuminate\Auth\Events\Login;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
Route::post('/login', [LoginController::class, 'login']);

Route::prefix('auth')->middleware('auth:api')->group(function(){
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::put('/profile/update', [UpdateProfileController::class, 'update']);
});

