<?php

namespace App\Providers;

use App\Services\Games\DbTestService;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceErrors;
use App\Services\Games\MedTivaService;
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
        $this->app->singleton(DbTestService::class, function ($app, $parameters) {
            return new DbTestService($parameters['gameSession']);
        });
        $this->app->singleton(MedTivaService::class, function ($app, $parameters) {
            return new MedTivaService($parameters['gameSession']);
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
