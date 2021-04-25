<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\MedTiva\Consts\MedTivaUnitType;
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
        return $this->count() === 0;
    }

    public function count(): int
    {
        $count = 0;
        foreach (array_keys(MedTivaUnitType::$all) as $unit_type) {
            $count += $this->$unit_type->count;
        }
        return $count;
    }

    public function has(MedTivaUnitBagData $units): bool
    {
        foreach (array_keys(MedTivaUnitType::$all) as $unit_type) {
            if ($this->$unit_type->level !== $units->$unit_type->level) return false;
            if ($this->$unit_type->count < $units->$unit_type->count) return false;
        }
        return true;
    }

    public function remove(MedTivaUnitBagData $units): void
    {
        foreach (MedTivaUnitType::$all as $unit_type => $_) {
            $this->$unit_type->count = max(0, $this->$unit_type->count - $units->$unit_type->count);
        }
    }

    public function add(MedTivaUnitBagData $units): void
    {
        foreach (MedTivaUnitType::$all as $unit_type => $_) {
            $this->$unit_type->count = max(0, $this->$unit_type->count + $units->$unit_type->count);
        }
    }
}
