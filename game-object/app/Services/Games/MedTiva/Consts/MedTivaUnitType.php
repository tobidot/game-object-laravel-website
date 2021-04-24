<?php

namespace App\Services\Games\MedTiva\Consts;

use App\Services\Games\MedTiva\Types\MedTivaUnitTypeData;

class MedTivaUnitType
{
    public const FOOTMAN = new MedTivaUnitTypeData([
        'type' => "footman",
        'unit_cost' => [1, 1.1, 1],
        'attack' => [1, 1, 1],
    ]);

    public const ALL = [
        self::FOOTMAN->type => self::FOOTMAN,
    ];
}
