<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use App\Models\GameSession;
use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaUpdateBuffer;
use App\Services\Games\MedTiva\Consts\MedTivaBuildingType;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\Consts\MedTivaUnitType;
use App\Services\Games\MedTiva\Types\MedTivaCaveData;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlainData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;
use App\Services\Games\MedTiva\Types\MedTivaUnitBagData;
use App\Services\Games\MedTiva\Types\MedTivaUnitMovementData;

class MedTivaServiceUpdates
{
    public GameSession $gameSession;

    public function __construct(
        GameSession $gameSession
    ) {
        $this->gameSession = $gameSession;
    }

    public function updatePlayer(Player $player, MedTivaUpdateBuffer $update_buffer)
    {
        $player_data = new MedTivaPlayerData($player->data);
        $player_data->movements = array_filter(array_map(function (MedTivaUnitMovementData $movement) use ($player, $player_data, $update_buffer) {
            $movement->ticks--;
            if ($movement->ticks <= 0) {
                return $this->finishMovement($player, $player_data, $movement, $update_buffer);
            }
            return $movement;
        }, $player_data->movements));
        $player_data->action_points = min($player_data->max_action_points, $player_data->action_points + 1);
        $player->data = $player_data->toArray();
    }

    protected function finishMovement(Player $player, MedTivaPlayerData $player_data, MedTivaUnitMovementData $movement, MedTivaUpdateBuffer $update_buffer): ?MedTivaUnitMovementData
    {
        /** @var MapField $target_field */
        /** @var MapField $source_field */
        $target_field = $update_buffer->fields->where('id', $movement->target_field_id)->first();
        $source_field = $update_buffer->fields->where('id', $movement->source_field_id)->first();

        switch ($target_field->base_type) {
            case MedTivaFieldBaseType::PLAIN:
                return $this->finishMovementToPlain($player_data, $movement, $source_field, $target_field, $update_buffer);
            case MedTivaFieldBaseType::CITY:
                return $this->finishMovementToCity($player, $player_data, $movement, $source_field, $target_field, $update_buffer);
            case MedTivaFieldBaseType::CAVE:
                return $this->finishMovementToCave($player_data, $movement, $source_field, $target_field, $update_buffer);
        }
    }



    protected function finishMovementToCity(
        Player $player,
        MedTivaPlayerData $player_data,
        MedTivaUnitMovementData $movement,
        MapField $source_field,
        MapField $field,
        MedTivaUpdateBuffer $update_buffer
    ): ?MedTivaUnitMovementData {
        $field_data = new MedTivaCityData($field->data);

        // friendly city 
        if ($field_data->player_id === $player->id) {
            // add to the existing units and dont return 
            // The city level will be used for the troops 
            $field_data->units->add($movement->units);
            $field->data = $field_data->toArray();
            return null;
        }

        $this->fight($movement->units, $field_data->units);
        $field->data = $field_data->toArray();

        // attack was defeated
        if ($movement->units->count() <= 0) return null;

        // collateral damage
        if ($movement->units->count() > $field_data->units->count()) {
            $building_type = MedTivaBuildingType::$all[array_rand(MedTivaBuildingType::$all)]->type;
            $field_data->buildings->$building_type->level = max(0, $field_data->buildings->$building_type->level - 1);
        }

        // the city was captured
        if ($field_data->units->count() <= 0) {
            $field_data->player_id = $player->id;
            $field_data->units = $movement->units;
            $field->data = $field_data->toArray();
            return null;
        }



        // return home
        [$movement->source_field_id, $movement->target_field_id] = [$movement->target_field_id, $movement->source_field_id];
        $movement->ticks = abs($source_field->x - $field->x) + abs($source_field->y - $field->y);

        return $movement;
    }

    protected function finishMovementToPlain(
        MedTivaPlayerData $player_data,
        MedTivaUnitMovementData $movement,
        MapField $source_field,
        MapField $field,
        MedTivaUpdateBuffer $update_buffer
    ): MedTivaUnitMovementData {
        $field_data = new MedTivaPlainData($field->data);

        // Nothing here simply run back and get some gold
        $random = (rand(10, 1000) + rand(10, 1000) / 2000);
        $player_data->gold += floor($random * (sqrt($movement->units->count() + 9) * 4 - 12) + 1);
        [$movement->source_field_id, $movement->target_field_id] = [$movement->target_field_id, $movement->source_field_id];
        $movement->ticks = abs($source_field->x - $field->x) + abs($source_field->y - $field->y);

        $field->data = $field_data->toArray();
        return $movement;
    }

    protected function finishMovementToCave(
        MedTivaPlayerData $player_data,
        MedTivaUnitMovementData $movement,
        MapField $source_field,
        MapField $field,
        MedTivaUpdateBuffer $update_buffer
    ): ?MedTivaUnitMovementData {
        $field_data = new MedTivaCaveData($field->data);

        // calculate fight results
        $this->fight($movement->units, $field_data->monsters);
        // anyone left to get the gold
        if ($movement->units->count() > 0) {
            // get treasures
            $player_data->gold += (rand(50, 200)) * $field_data->danger_level;
        }

        $field->data = $field_data->toArray();

        // no one to return
        if ($movement->units->count() === 0) return null;

        // return home
        [$movement->source_field_id, $movement->target_field_id] = [$movement->target_field_id, $movement->source_field_id];
        $movement->ticks = abs($source_field->x - $field->x) + abs($source_field->y - $field->y);

        return $movement;
    }

    protected function fight(
        MedTivaUnitBagData $team_a,
        MedTivaUnitBagData $team_b
    ): void {
        if ($team_a->count() === 0) return;
        if ($team_b->count() === 0) return;
        // fight the monsters
        $team_a_attack = 0;
        $team_b_attack = 0;
        foreach (MedTivaUnitType::$all as $type_name => $type) {
            $team_a_attack += $type->getAttackAtLevel($team_a->$type_name->level) * $team_a->$type_name->count;
            $team_b_attack += $type->getAttackAtLevel($team_b->$type_name->level) * $team_b->$type_name->count;
        }

        $team_a_attack = sqrt($team_a_attack);
        $team_b_attack = sqrt($team_b_attack);
        $team_a_advantage = $team_a_attack - $team_b_attack;
        $team_a_death_rate = min(1, (atan(-$team_a_advantage / 50) * 2 / pi() + 0.5));
        $team_b_death_rate = min(1, (atan($team_a_advantage / 50) * 2 / pi() + 0.5));

        foreach (MedTivaUnitType::$all as $type_name => $type) {
            if ($team_a_death_rate > 0) {
                $r = rand(0, 0xffff) / 0xffff;
                $deaths = round(pow($r, 0.5 / $team_a_death_rate) * $team_a->$type_name->count);
                $team_a->$type_name->count = max(0, $team_a->$type_name->count - $deaths);
            }
            if ($team_b_death_rate > 0) {
                $r = rand(0, 0xffff) / 0xffff;
                $deaths = round(pow($r, 0.5 / $team_b_death_rate) * $team_b->$type_name->count);
                $team_b->$type_name->count = max(0, $team_b->$type_name->count - $deaths);
            }
        }
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
