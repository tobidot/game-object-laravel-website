<?php


namespace App\Services\Games;

use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\GameService;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\Consts\MedTivaUnitType;
use App\Services\Games\MedTiva\MedTivaUpdateBuffer;
use Symfony\Component\HttpFoundation\ParameterBag;
use App\Services\Games\MedTiva\types\MedTivaCaveData;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlainData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;
use App\Services\Games\MedTiva\Types\MedTivaUnit;
use App\Services\Games\MedTiva\Types\MedTivaUnitBag;
use App\Services\Games\MedTiva\Types\MedTivaUnitBagData;
use App\Services\Games\MedTiva\Types\MedTivaUnitTypeData;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * 
 */
class MedTivaService extends GameService
{

    public function newGame(ParameterBag $parameters)
    {
        for ($x = 0; $x < 5; ++$x) {
            for ($y = 0; $y < 5; ++$y) {
                $this->newField($x, $y);
            }
        }
    }

    public function newPlayer(Player $player, ParameterBag $parameters)
    {
        $player->data = (new MedTivaPlayerData([]))->toArray();
        $player->save();
        $field = $this->gameSession->mapFields()->getQuery()->where('base_type', MedTivaFieldBaseType::PLAIN)->inRandomOrder()->first();
        $field->base_type = MedTivaFieldBaseType::CITY;
        $data = new MedTivaCityData([]);
        $data->player_id = $player->id;
        $data->buildings->hut->level = 1;
        $field->data = $data->toArray();
        $field->save();
    }

    public function update()
    {
        $update_buffer = new MedTivaUpdateBuffer($this->gameSession);
        $update_buffer->fields->each(function (MapField $field) use ($update_buffer) {
            $this->updateField($field, $update_buffer);
        });
        $update_buffer->players->each(function (Player $player) {
            $player->save();
        });
        $update_buffer->fields->each(function (MapField $field) {
            $field->save();
        });
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

    protected function newField(int $x, int $y): MapField
    {
        $base_type = random_int(0, count(MedTivaFieldBaseType::ALL) - 1);
        switch ($base_type) {
            case MedTivaFieldBaseType::CITY:
                $data = (new MedTivaCityData([]))->toArray();
                break;
            case MedTivaFieldBaseType::CAVE:
                $data = (new MedTivaCaveData([]))->toArray();
                break;
            default:
            case MedTivaFieldBaseType::PLAIN:
                $data = (new MedTivaPlainData([]))->toArray();
                break;
        }

        return MapField::create([
            'x' => $x,
            'y' => $y,
            'base_type' => $base_type,
            'data' => $data,
            'game_session_id' => $this->gameSession->id,
        ]);
    }

    public function handleAction(Player $player, string $action_type, array $action_data): JsonResponse
    {
        switch ($action_type) {

            case 'build':
                return $this->handleBuild(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['building'] ?? ''
                );

            case 'recruit':
                return $this->handleRecruit(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['unit'] ?? '',
                    $action_data['amount'] ?? 0
                );

            case 'move':
                return $this->handleMove(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['target_x'] ?? 0,
                    $action_data['target_y'] ?? 0,
                    new MedTivaUnitBagData($action_data['units'] ?? [])
                );
        }
        return response()->json([
            'success' => false,
            'reason' => 'Unknown action_type ' . $action_type,
        ]);
    }


    public function handleRecruit(
        Player $player,
        int $x,
        int $y,
        string $unit,
        int $amount,
    ): JsonResponse {
        if ($amount < 1) return $this->errorInvalidArgument('Amount should be greater than 1', $amount);
        if (property_exists(MedTivaUnitBag::class, $unit) === false) return $this->errorInvalidUnitType($unit);
        $field = $this->gameSession->mapFieldAt($x, $y);
        if ($field === null) return $this->errorInvalidField($x, $y);
        if ($field->base_type !== MedTivaFieldBaseType::CITY) return $this->errorInvalidField($x, $y);
        $field_data = new MedTivaCityData($field->data);
        if ($field_data->player_id !== $player->id) return $this->errorInvalidField($x, $y);

        /** @var MedTivaUnit $unit_data */
        $unit_data = $field_data->units->$unit;
        $cost = MedTivaUnitType::FOOTMAN->getUnitCostAtLevel($unit_data->level) * $amount;
        $player_data = new MedTivaPlayerData($player->data);

        if ($player_data->gold < $cost) {
            return $this->error('Not Enough Gold');
        }

        $player_data->gold -= $cost;
        $unit_data->count += $amount;

        $field->data = $field_data->toArray();
        $player->data = $player_data->toArray();

        DB::beginTransaction();
        $field->save();
        $player->save();
        DB::commit();

        return response()->json([
            'success' => true,
            'data' => [
                'player' => $player->data,
                'field' => $field->data,
            ]
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
        return response()->json([
            'success' => false,
            'reason' => 'Action not implemented',
        ]);
    }

    public function handleBuild(
        Player $player,
        int $x,
        int $y,
        string $building,
    ): JsonResponse {
        return response()->json([
            'success' => false,
            'reason' => 'Action not implemented',
        ]);
    }

    public function error(string $reason, array $details = [])
    {
        return response()->json([
            'success' => false,
            'reason' => $reason,
            'details' => $details,
        ]);
    }
    public function errorGameplay(string $reason, array $details = [])
    {
        return response()->json([
            'success' => false,
            'reason' => 'Unable to perform that action right now',
            'details' => array_merge(['message' => $reason, $details]),
        ]);
    }

    public function errorInvalidField(int $x, int $y): JsonResponse
    {
        return $this->error(
            'Field is not a valid target or does not exist',
            [
                'x' => $x,
                'y' => $y,
            ]
        );
    }

    public function errorInvalidUnitType(string $unit_type): JsonResponse
    {
        return $this->error(
            'Unittype is not valid for this action or does not exist',
            [
                'unit_type' => $unit_type,
            ]
        );
    }

    public function errorInvalidArgument(string $message, $received): JsonResponse
    {
        return $this->error(
            'Invalid argument: ' . $message,
            [
                'received' => $received,
            ]
        );
    }
}
