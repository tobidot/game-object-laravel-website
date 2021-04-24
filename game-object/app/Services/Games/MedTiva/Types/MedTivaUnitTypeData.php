<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaUnitTypeData extends TypeHint
{
    public string $type;

    private float $unit_cost_initial;
    private float $unit_cost_mul_factor;
    private float $unit_cost_add_factor;

    private float $attack_initial;
    private float $attack_mul_factor;
    private float $attack_add_factor;

    public function __construct(array $input)
    {
        $this->unpack_level_scaling($input, 'unit_cost', [1, 1.1, 1]);
        $this->unpack_level_scaling($input, 'attack', [1, 1.1, 1]);
        $this->type = $input['type'] ?? '';
    }

    private function unpack_level_scaling(array $input, string $param_name, array $default): void
    {
        $initial = "{$param_name}_initial";
        $mul_factor = "{$param_name}_mul_factor";
        $add_factor = "{$param_name}_add_factor";
        [$this->$initial, $this->$mul_factor, $this->$add_factor] = $input[$param_name] ?? $default;
    }

    public function getUnitCostAtLevel(int $level)
    {
        if ($level === 0) return $this->unit_cost_initial;
        return $this->unit_cost_mul_factor * $this->getUnitCostAtLevel($level - 1) + $this->unit_cost_add_factor;
    }

    public function getAttackAtLevel(int $level)
    {
        if ($level === 0) return $this->attack_initial;
        return $this->attack_mul_factor * $this->getUnitCostAtLevel($level - 1) + $this->attack_add_factor;
    }
}
