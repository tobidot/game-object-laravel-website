<?php

namespace App\Services;

use App\Models\Player;

class PlayerAuthenticationService
{
    public ?Player $player = null;

    public function player(): ?Player
    {
        return $this->player;
    }

    public function checkPassword(Player $player, string $password): bool
    {
        return $player->password === $password;
    }

    public function authenticate(): ?Player
    {
        $auth_token = session('auth_token', request()->get('auth_token', null));
        if (empty($auth_token)) return null;
        $this->player = Player::query()->where('auth_token', $auth_token)->first();
        return $this->player;
    }
}
