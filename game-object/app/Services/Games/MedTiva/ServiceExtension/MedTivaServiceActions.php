<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use App\Models\GameSession;
use App\Models\Player;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\Consts\MedTivaUnitType;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceErrors;
use App\Services\Games\MedTiva\Types\MedTivaBuildingData;
use App\Services\Games\MedTiva\Types\MedTivaBuildingTypeData;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;
use App\Services\Games\MedTiva\Types\MedTivaUnit;
use App\Services\Games\MedTiva\Types\MedTivaUnitBag;
use App\Services\Games\MedTiva\Types\MedTivaUnitBagData;
use App\Services\Games\MedTiva\Types\MedTivaUnitMovementData;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class MedTivaServiceActions
{
    private MedTivaServiceErrors $errors;
    public GameSession $gameSession;

    public function __construct(
        GameSession $gameSession,
        MedTivaServiceErrors $errors,
    ) {
        $this->gameSession = $gameSession;
        $this->errors = $errors;
    }



    public function handleRecruit(
        Player $player,
        int $x,
        int $y,
        string $unit,
        int $amount,
    ): JsonResponse {
        if ($amount < 1) return $this->errors->InvalidArgument('Amount should be greater than 1', $amount);
        if (array_key_exists($unit, MedTivaUnitType::$all) === false) return $this->errors->invalidUnitType($unit);
        $field = $this->gameSession->mapFieldAt($x, $y);
        if ($field === null) return $this->errors->invalidField($x, $y);
        if ($field->base_type !== MedTivaFieldBaseType::CITY) return $this->errors->invalidField($x, $y);
        $field_data = new MedTivaCityData($field->data);
        if ($field_data->player_id !== $player->id) return $this->errors->invalidField($x, $y);

        /** @var MedTivaUnit $unit_data */
        $unit_data = $field_data->units->$unit;
        $cost = MedTivaUnitType::$all[$unit]->getUnitCostAtLevel($unit_data->level) * $amount;
        $player_data = new MedTivaPlayerData($player->data);

        if ($player_data->gold < $cost) {
            return $this->errors->error('Not Enough Gold');
        }

        $player_data->gold -= $cost;
        $unit_data->count += $amount;

        $field->data = $field_data->toArray();
        $player->data = $player_data->toArray();

        DB::beginTransaction();
        $field->save();
        $player->save();
        DB::commit();

        return $this->success([
            'player' => $player->data,
            'field' => $field->data,
        ]);
    }

    public function handleMove(
        Player $player,
        int $x,
        int $y,
        int $target_x,
        int $target_y,
        MedTivaUnitBagData $units,
    ): JsonResponse {
        if ($x === $target_x && $y === $target_y) return $this->errors->invalidField($x, $y);
        $field = $this->gameSession->mapFieldAt($x, $y);
        if ($field === null) return $this->errors->invalidField($x, $y);
        if ($field->base_type !== MedTivaFieldBaseType::CITY) return $this->errors->invalidField($x, $y);
        $field_data = new MedTivaCityData($field->data);
        if ($field_data->player_id !== $player->id) return $this->errors->invalidField($x, $y);

        $target_field = $this->gameSession->mapFieldAt($target_x, $target_y);
        if ($target_field === null) return $this->errors->invalidField($x, $y);

        $player_data = new MedTivaPlayerData($player->data);
        if ($player_data->action_points < 1) return $this->errors->gameplay('Insufficient Action Points', [
            'action_points' => $player_data->action_points,
            'needed' => 1,
        ]);

        /** @var MedTivaBuildingData $building_data */
        if ($field_data->units->has($units) === false) return $this->errors->gameplay('More Troops requested than Available', [
            'available' => $field_data->units->toArray(),
            'requested' => $units->toArray(),
        ]);

        /**
         * Perform Action
         */

        $player_data->action_points--;
        $player_data->movements[] = new MedTivaUnitMovementData([
            'units' => $units->toArray(),
            'target_field_id' => $target_field->id,
            'source_field_id' => $field->id,
            'ticks' => abs($x - $target_x) + abs($y - $target_y),
        ]);
        $field_data->units->remove($units);

        $field->data = $field_data->toArray();
        $player->data = $player_data->toArray();

        DB::beginTransaction();
        $field->save();
        $player->save();
        DB::commit();

        return $this->success([
            'player' => $player->data,
            'field' => $field->data,
        ]);
    }

    public function handleBuild(
        Player $player,
        int $x,
        int $y,
        string $building,
    ): JsonResponse {

        if (property_exists(MedTivaBuildingType::class, $building) === false) return $this->errors->invalidBuildingType($building);
        $field = $this->gameSession->mapFieldAt($x, $y);
        if ($field === null) return $this->errors->invalidField($x, $y);
        if ($field->base_type !== MedTivaFieldBaseType::CITY) return $this->errors->invalidField($x, $y);
        $field_data = new MedTivaCityData($field->data);
        if ($field_data->player_id !== $player->id) return $this->errors->invalidField($x, $y);

        /** @var MedTivaBuildingData $building_data */
        $building_data = $field_data->buildings->$building;
        $cost = MedTivaUnitType::$all[$building]->getUnitCostAtLevel($building_data->level);
        $player_data = new MedTivaPlayerData($player->data);

        if ($player_data->gold < $cost) {
            return $this->errors->error('Not Enough Gold');
        }

        $player_data->gold -= $cost;
        $building_data->level++;

        $field->data = $field_data->toArray();
        $player->data = $player_data->toArray();

        DB::beginTransaction();
        $field->save();
        $player->save();
        DB::commit();

        return $this->success([
            'player' => $player->data,
            'field' => $field->data,
        ]);
    }

    public function success(array $data): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
