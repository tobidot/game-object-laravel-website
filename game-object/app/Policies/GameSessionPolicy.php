<?php

namespace App\Policies;

use App\Models\GameSession;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GameSessionPolicy
{
    use HandlesAuthorization;

    public function view(?User $user, GameSession $gameSession): bool
    {
        $player = player();
        if ($player === null) return false;
        return $gameSession->players()->where('id', $player->id)->count() === 1;
    }

    public function update(?User $user, GameSession $gameSession): bool
    {
        $player = player();
        if ($player === null) return false;
        return $gameSession->players()->where('id', $player->id)->count() === 1;
    }
}
