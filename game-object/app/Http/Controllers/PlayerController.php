<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AuthenticatePlayer;
use App\Models\Player;
use App\Services\PlayerAuthenticationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class PlayerController extends Controller
{
    public function authenticate(Player $player, Request $request)
    {
        $parameter = $this->validate($request, [
            'display_name' => ['required', "in:{$player->display_name}"],
            'password' => ['required']
        ]);

        /** @var PlayerAuthenticationService $player_authentication */
        $player_authentication = App::make(PlayerAuthenticationService::class);
        $success = $player_authentication->checkPassword($player, $parameter['password']);
        if (!$success) {
            return back()->withErrors('Incorrect password');
        }
        return back()->with([
            'message' => 'Successful authenticated'
        ]);
    }
}
