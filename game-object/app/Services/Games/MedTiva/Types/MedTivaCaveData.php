<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaCaveData  extends TypeHint
{
    public int $ticks_until_spawn;
    public int $danger_level;
    public MedTivaUnitBagData $monsters;

    public function __construct(array $input)
    {
        $this->danger_level = $input['danger_level'] ?? random_int(0, 9);
        $this->ticks_until_spawn = $input['danger_level'] ?? 0;
        $this->monsters = new MedTivaUnitBagData($input['monsters'] ?? []);
    }
}
