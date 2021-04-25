<?php

namespace App\Services\Games\MedTiva\Types;

use App\Exceptions\GoInvalidGameStateException;
use App\Services\Games\Utils\TypeHint;

class MedTivaUnitMovementData extends TypeHint
{
    public MedTivaUnitBagData $units;
    public int $ticks;
    public int $target_field_id;
    public int $source_field_id;

    public function __construct(array $input)
    {
        $this->units = new MedTivaUnitBagData($input['units'] ?? []);
        $this->ticks = $input['ticks'] ?? 10;
        $this->target_field_id = $input['target_field_id'] ?? throw new GoInvalidGameStateException('UnitMovemnt::$target_field_id is null');
        $this->source_field_id = $input['source_field_id'] ?? throw new GoInvalidGameStateException('UnitMovemnt::$source_field_id is null');
    }
}
