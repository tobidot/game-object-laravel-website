<?php

namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\Player;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\ParameterBag;

abstract class GameService
{
    public GameSession $gameSession;

    public abstract function newGame(ParameterBag $parameters);

    public abstract function newPlayer(Player $player, ParameterBag $parameters);

    public abstract function handle(Player $player, ParameterBag $parameters);

    public abstract function update();

    public function iregularUpdate()
    {
        /** @var Carbon $last_update_step_at */
        $last_update_step_at = $this->gameSession->last_update_step_at;
        $now = now();
        $steps = $last_update_step_at->diffInMinutes($now);
        for ($i = 0; $i < $steps; $i++) {
            $this->update();
        }
        $this->gameSession->last_update_step_at = $now;
        $this->gameSession->save();
    }
}
