<?php

namespace App\Services\Games\MedTiva;

use App\Services\Games\Utils\TypeHint;

class MedTivaBuilding extends TypeHint
{
    public int $level;
    public int $ticks;

    public function __construct(array $input)
    {
        $this->level = $input['level'] ?? 0;
        $this->ticks = $input['ticks'] ?? 0;
    }
}
