<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Passport\Passport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Passport::$keyPath = storage_path(); // ✅ required!
        Passport::loadKeysFrom(storage_path()); // ✅ loads oauth keys

        // Optional: Use UUIDs or custom route logic here if needed
        // Passport::ignoreRoutes(); // only if you want to define routes manually
    }
}
