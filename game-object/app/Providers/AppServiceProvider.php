<?php

namespace App\Providers;

use App\Services\PlayerAuthenticationService;
use AuthenticatedPlayerService;
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
