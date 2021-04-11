<?php

namespace App\Http\Middleware;

use App\Services\PlayerAuthenticationService;
use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AuthenticatePlayer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $type)
    {
        /** @var PlayerAuthenticationService $player_authentication */
        $player_authentication = App::make(PlayerAuthenticationService::class);
        $player = $player_authentication->authenticate();
        if ($type !== "") {
            if ($player === null) throw new AuthorizationException();
        }

        return $next($request);
    }
}
