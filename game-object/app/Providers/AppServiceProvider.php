<?php

namespace App\Providers;

use App\Services\Games\DbTestService;
use App\Services\PlayerAuthenticationService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(PlayerAuthenticationService::class, function () {
            return new PlayerAuthenticationService();
        });
        $this->app->singleton(DbTestService::class, function () {
            return new DbTestService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
    }
}
