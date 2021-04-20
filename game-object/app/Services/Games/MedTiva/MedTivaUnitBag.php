<?php

namespace App\Services\Games\MedTiva;

class MedTivaUnitBag
{
    public MedTivaUnit $villager;
    public MedTivaUnit $footman;

    public function __construct(array $input)
    {
        $this->villager = new MedTivaUnit($input['villager'] ?? []);
        $this->footman = new MedTivaUnit($input['footman'] ?? []);
    }
}
