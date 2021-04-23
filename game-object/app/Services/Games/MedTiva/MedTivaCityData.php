<?php

namespace App\Services\Games\MedTiva;

use App\Services\Games\Utils\TypeHint;

class MedTivaCityData extends TypeHint
{
    public int $player_id;
    public MedTivaBuildingBag $buildings;
    public MedTivaUnitBag $units;

    public function __construct(array $input = [])
    {
        $this->player_id = $input['player_id'] ?? 0;
        $this->buildings = new MedTivaBuildingBag($input['buildings'] ?? []);
        $this->units = new MedTivaUnitBag($input['units'] ?? []);
    }
}
