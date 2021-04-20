<?php

namespace App\Services\Games\MedTiva;

class MedTivaUnit
{
    public int $count;
    public int $level;

    public function __construct(array $input)
    {
        $this->count = $input['count'] ?? 0;
        $this->level = $input['level'] ?? 0;
    }
}
