<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
{
    

$validate = Validator::make($request->all(), [
    'email' => 'required|email',
    'password' => 'required'
], [
    'email.required' => 'Email is required.',
    'email.email' => 'Enter a valid email address.',
    'password.required' => 'Password is required.'
]);

if ($validate->fails()) {
    return response()->json([
        'status' => false,
        'errors' => $validate->errors()
    ], 422);
}

    

    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        $user = Auth::user();

        // Create token via Passport
        // $token = $user->createToken('VueAppToken')->accessToken;

        return response()->json([
            'status' => true,
            'message' => 'Login successful',
            'user' => $user,
           
        ]);
    } else {
        return response()->json([
            'status' => false,
            'message' => 'Invalid credentials'
        ], 401);
    }
}
}
