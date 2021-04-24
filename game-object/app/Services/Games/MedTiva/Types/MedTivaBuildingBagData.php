<?php

namespace App\Services\Games\MedTiva\Types;

use App\Services\Games\Utils\TypeHint;

class MedTivaBuildingBagData extends TypeHint
{
    public MedTivaBuildingData $hut;
    public MedTivaBuildingData $training_camp;

    public function __construct(array $input)
    {
        $this->hut = new MedTivaBuildingData($input['hut'] ?? []);
        $this->training_camp = new MedTivaBuildingData($input['training_camp'] ?? []);
    }
}
