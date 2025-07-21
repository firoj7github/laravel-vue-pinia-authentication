<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateProfileController extends Controller
{
    public function update(Request $request){
    
        $user = Auth::user();

        if (!$user) {
        return response()->json([
            'message' => 'User not authenticated',
        ], 401);
    }
        $validated = $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => [
            'required',
            'email',
            'max:255']
       
    ]);

     $user->update($validated);

     return response()->json([
        'message' => 'Profile updated successfully.',
        'user' => $user,
     ]);
}
}
