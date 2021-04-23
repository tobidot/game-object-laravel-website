<?php

namespace App\Services\Games\MedTiva;

use App\Services\Games\Utils\TypeHint;

class MedTivaBuildingBag extends TypeHint
{
    public MedTivaBuilding $hut;
    public MedTivaBuilding $training_camp;

    public function __construct(array $input)
    {
        $this->hut = new MedTivaBuilding($input['hut'] ?? []);
        $this->training_camp = new MedTivaBuilding($input['training_camp'] ?? []);
    }
}
