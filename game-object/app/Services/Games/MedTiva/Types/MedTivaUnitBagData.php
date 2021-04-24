<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaUnitBagData extends TypeHint
{
    public MedTivaUnitData $villager;
    public MedTivaUnitData $footman;
    public MedTivaUnitData $goblin;

    public function __construct(array $input)
    {
        $this->villager = new MedTivaUnitData($input['villager'] ?? []);
        $this->footman = new MedTivaUnitData($input['footman'] ?? []);
        $this->goblin = new MedTivaUnitData($input['goblin'] ?? []);
    }

    public function isEmpty(): bool
    {
        return $this->villager->count === 0
            && $this->goblin->count === 0
            && $this->footman->count === 0;
    }
}
