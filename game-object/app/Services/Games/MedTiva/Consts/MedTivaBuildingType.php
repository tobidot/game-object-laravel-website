<?php

namespace App\Services\Games\MedTiva\Consts;

use App\Services\Games\MedTiva\Types\MedTivaBuildingTypeData;
use App\Services\Games\MedTiva\Types\MedTivaUnitTypeData;

class MedTivaBuildingType
{
    public static MedTivaBuildingTypeData $hut;
    public static MedTivaBuildingTypeData $training_camp;

    /**
     * @var MedTivaBuildingTypeData[] $all
     */
    public static array $all;
}

MedTivaBuildingType::$hut = new MedTivaBuildingTypeData([
    'type' => "hut",
    'building_cost' => [10, 1, 10],
]);

MedTivaBuildingType::$training_camp = new MedTivaBuildingTypeData([
    'type' => "training_camp",
    'building_cost' => [50, 1.25, 0],
]);

MedTivaBuildingType::$all = [
    MedTivaBuildingType::$hut->type => MedTivaBuildingType::$hut,
    MedTivaBuildingType::$training_camp->type => MedTivaBuildingType::$training_camp,
];
