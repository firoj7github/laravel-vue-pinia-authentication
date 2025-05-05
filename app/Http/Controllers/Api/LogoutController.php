<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $request){
    $request->user()->token()->revoke(); // Revoke current token
    return response()->json(['message' => 'Logged out successfully']);
    }
}
