<?php

use App\Models\Player;
use App\Services\Games\GameService;
use Symfony\Component\HttpFoundation\ParameterBag;

class MedTiva extends GameService
{

    public function newGame(ParameterBag $parameters)
    {
    }

    public function newPlayer(Player $player, ParameterBag $parameters)
    {
    }

    public function handle(Player $player, ParameterBag $parameters)
    {
    }

    public function update()
    {
    }
}
