<?php

namespace App\Services\Games\MedTiva;

use App\Services\Games\Utils\TypeHint;

class MedTivaPlayerData extends TypeHint
{
    public int $gold;
    public int $monster_shards;
    public int $score;
    public int $action_points;
    public int $max_action_points;

    public function __construct(array $input)
    {
        $this->gold = $input['gold'] ?? 0;
        $this->monster_shards = $input['monster_shards'] ?? 0;
        $this->score = $input['score'] ?? 0;
        $this->action_points =  $input['action_points'] ?? 20;
        $this->max_action_points = $input['max_action_points'] ?? 20;
    }
}
