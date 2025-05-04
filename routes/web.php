<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('welcome'); // The Blade file that loads your Vue app
})->where('any', '.*');
