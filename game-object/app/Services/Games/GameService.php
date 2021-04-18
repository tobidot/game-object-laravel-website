<?php

namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\Player;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\ParameterBag;

abstract class GameService
{
    public GameSession $gameSession;

    public abstract function newGame(ParameterBag $parameters);

    public abstract function newPlayer(Player $player, ParameterBag $parameters);

    public abstract function handle(Player $player, ParameterBag $parameters);
}
