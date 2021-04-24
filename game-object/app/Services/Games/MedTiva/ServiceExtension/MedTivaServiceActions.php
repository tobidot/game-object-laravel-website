<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use App\Models\GameSession;
use App\Models\Player;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\Consts\MedTivaUnitType;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceErrors;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;
use App\Services\Games\MedTiva\Types\MedTivaUnit;
use App\Services\Games\MedTiva\Types\MedTivaUnitBag;
use App\Services\Games\MedTiva\Types\MedTivaUnitBagData;
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
        $cost = MedTivaUnitType::$footman->getUnitCostAtLevel($unit_data->level) * $amount;
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
        return $this->errors->notImplemented();
    }

    public function handleBuild(
        Player $player,
        int $x,
        int $y,
        string $building,
    ): JsonResponse {

        // if ($amount < 1) return $this->errors->InvalidArgument('Amount should be greater than 1', $amount);
        // if (property_exists(MedTivaUnitBag::class, $unit) === false) return $this->errors->invalidUnitType($unit);
        // $field = $this->gameSession->mapFieldAt($x, $y);
        // if ($field === null) return $this->errors->invalidField($x, $y);
        // if ($field->base_type !== MedTivaFieldBaseType::CITY) return $this->errors->invalidField($x, $y);
        // $field_data = new MedTivaCityData($field->data);
        // if ($field_data->player_id !== $player->id) return $this->errors->invalidField($x, $y);

        // /** @var MedTivaUnit $unit_data */
        // $unit_data = $field_data->units->$unit;
        // $cost = MedTivaUnitType::FOOTMAN->getUnitCostAtLevel($unit_data->level) * $amount;
        // $player_data = new MedTivaPlayerData($player->data);

        // if ($player_data->gold < $cost) {
        //     return $this->errors->error('Not Enough Gold');
        // }

        // $player_data->gold -= $cost;
        // $unit_data->count += $amount;

        // $field->data = $field_data->toArray();
        // $player->data = $player_data->toArray();

        // DB::beginTransaction();
        // $field->save();
        // $player->save();
        // DB::commit();

        // return $this->success([
        //     'player' => $player->data,
        //     'field' => $field->data,
        // ]);
        return $this->errors->notImplemented();
    }

    public function success(array $data): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
