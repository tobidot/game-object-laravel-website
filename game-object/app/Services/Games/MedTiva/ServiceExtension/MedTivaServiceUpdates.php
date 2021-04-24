<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use App\Models\GameSession;
use App\Models\MapField;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\MedTivaUpdateBuffer;
use App\Services\Games\MedTiva\Types\MedTivaCaveData;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlainData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;

class MedTivaServiceUpdates
{
    public GameSession $gameSession;

    public function __construct(
        GameSession $gameSession
    ) {
        $this->gameSession = $gameSession;
    }


    public function updateField(MapField $field, MedTivaUpdateBuffer $update_buffer)
    {
        switch ($field->base_type) {
            case MedTivaFieldBaseType::CAVE:
                $data = $this->updateFieldCave($field, $update_buffer);
                $field->data = $data;
                break;
            case MedTivaFieldBaseType::CITY:
                $data = $this->updateFieldCity($field, $update_buffer);
                break;
            case MedTivaFieldBaseType::PLAIN:
                $data = new MedTivaPlainData($field->data);
            default:
                $data = [];
                break;
        }
        $field->data = $data;
    }

    protected function updateFieldCity(MapField $field, MedTivaUpdateBuffer $update_buffer): array
    {
        $data = new MedTivaCityData($field->data);
        if ($data->player_id === 0) return $data->toArray();
        $player = $update_buffer->players->find($data->player_id);
        if ($player === null) return $data->toArray();
        $player_data = new MedTivaPlayerData($player->data);
        $player_data->gold += $data->buildings->hut->level;
        $player_data->gold -= $data->buildings->training_camp->level;
        $player_data->gold = max(0, $player_data->gold);
        $player->data = $player_data;
        return $data->toArray();
    }

    protected function updateFieldCave(MapField $field, MedTivaUpdateBuffer $update_buffer): array
    {
        $data = new MedTivaCaveData($field->data);
        if ($data->monsters->isEmpty()) {
            $data->ticks_until_spawn--;
        }
        if ($data->ticks_until_spawn <= 0) {
            $data->ticks_until_spawn = 15;
            $data->monsters->goblin->level = random_int(
                max(0, $data->danger_level - 2),
                $data->danger_level + 2
            );
            $data->monsters->goblin->count = random_int(
                1,
                ($data->danger_level + 1) * 5
            );
        }
        return $data->toArray();
    }
}
