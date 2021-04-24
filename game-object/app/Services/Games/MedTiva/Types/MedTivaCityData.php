<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaCityData extends TypeHint
{
    public int $player_id;
    public MedTivaBuildingBagData $buildings;
    public MedTivaUnitBagData $units;

    public function __construct(array $input = [])
    {
        $this->player_id = $input['player_id'] ?? 0;
        $this->buildings = new MedTivaBuildingBagData($input['buildings'] ?? []);
        $this->units = new MedTivaUnitBagData($input['units'] ?? []);
    }
}
