<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaUnitData extends TypeHint
{
    public int $count;
    public int $level;

    public function __construct(array $input)
    {
        $this->count = $input['count'] ?? 0;
        $this->level = $input['level'] ?? 0;
    }
}
