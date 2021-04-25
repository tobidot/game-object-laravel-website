<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaBuildingTypeData extends TypeHint
{
    public string $type;

    public function __construct(array $input)
    {
        $this->type = $input['type'] ?? '';
        $this->unpack_level_scaling($input, 'building_cost', []);
    }

    private function unpack_level_scaling(array $input, string $param_name, array $default): void
    {
        $initial = "{$param_name}_initial";
        $mul_factor = "{$param_name}_mul_factor";
        $add_factor = "{$param_name}_add_factor";
        [$this->$initial, $this->$mul_factor, $this->$add_factor] = $input[$param_name] ?? $default;
    }

    protected function getAttributeAtLevel(string $param_name, int $level)
    {
        $initial = "{$param_name}_initial";
        $mul_factor = "{$param_name}_mul_factor";
        $add_factor = "{$param_name}_add_factor";
        if ($level === 0) return $this->initial;
        return $this->mul_factor * $this->getBuildingCostAtLevel($level - 1) + $this->add_factor;
    }

    public function getBuildingCostAtLevel(int $level)
    {
        return $this->getAttributeAtLevel('building_cost', $level);
    }
}
