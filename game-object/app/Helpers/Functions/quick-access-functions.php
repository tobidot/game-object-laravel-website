<?php

use App\Models\Player;
use App\Services\PlayerAuthenticationService;
use Illuminate\Support\Facades\App;

function player(): ?Player
{
    return App::make(PlayerAuthenticationService::class)->player();
}
