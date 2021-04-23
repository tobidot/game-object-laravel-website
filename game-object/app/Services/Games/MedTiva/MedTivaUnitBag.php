<?php

namespace App\Services\Games\MedTiva;

use App\Services\Games\Utils\TypeHint;

class MedTivaUnitBag extends TypeHint
{
    public MedTivaUnit $villager;
    public MedTivaUnit $footman;
    public MedTivaUnit $goblin;

    public function __construct(array $input)
    {
        $this->villager = new MedTivaUnit($input['villager'] ?? []);
        $this->footman = new MedTivaUnit($input['footman'] ?? []);
        $this->goblin = new MedTivaUnit($input['goblin'] ?? []);
    }

    public function isEmpty(): bool
    {
        return $this->villager->count === 0
            && $this->goblin->count === 0
            && $this->footman->count === 0;
    }
}
