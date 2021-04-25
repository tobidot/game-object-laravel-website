<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use App\Models\GameSession;
use Illuminate\Database\Eloquent\Collection;

class MedTivaUpdateBuffer
{
    public Collection $players;
    public Collection $fields;

    public function __construct(GameSession $gameSession)
    {
        $this->players = $gameSession->players()->get();
        $this->fields = $gameSession->mapFields()->get();
    }
}
