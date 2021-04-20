<?php

namespace App\Services\Games\MedTiva;

class MedTivaBuilding
{
    public int $level;
    public int $ticks;

    public function __construct(array $input)
    {
        $this->level = $input['level'] ?? 0;
        $this->ticks = $input['ticks'] ?? 0;
    }
}
