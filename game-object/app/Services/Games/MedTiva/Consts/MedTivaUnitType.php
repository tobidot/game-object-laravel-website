<?php

namespace App\Services\Games\MedTiva\Consts;

use App\Services\Games\MedTiva\Types\MedTivaUnitTypeData;

class MedTivaUnitType
{
    public static MedTivaUnitTypeData $footman;

    /**
     * @var MedTivaUnitTypeData[] $all
     */
    public static array $all;
}

MedTivaUnitType::$footman = new MedTivaUnitTypeData([
    'type' => "footman",
    'unit_cost' => [1, 1.1, 1],
    'attack' => [1, 1, 1],
]);

MedTivaUnitType::$all = [
    MedTivaUnitType::$footman->type => MedTivaUnitType::$footman,
];
