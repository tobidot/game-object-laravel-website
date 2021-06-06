<?php


namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\GameService;
use App\Services\Games\MedTiva\Consts\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceActions;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceErrors;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaServiceUpdates;
use App\Services\Games\MedTiva\ServiceExtension\MedTivaUpdateBuffer;
use Symfony\Component\HttpFoundation\ParameterBag;
use App\Services\Games\MedTiva\Types\MedTivaCaveData;
use App\Services\Games\MedTiva\Types\MedTivaCityData;
use App\Services\Games\MedTiva\Types\MedTivaPlainData;
use App\Services\Games\MedTiva\Types\MedTivaPlayerData;
use App\Services\Games\MedTiva\Types\MedTivaUnitBagData;
use Illuminate\Http\JsonResponse;

/**
 * 
 */
class MedTivaService extends GameService
{
    private MedTivaServiceErrors $errors;
    private MedTivaServiceUpdates $updates;
    private MedTivaServiceActions $actions;

    public function __construct(GameSession $gameSession)
    {
        parent::__construct($gameSession);
        $this->errors = new MedTivaServiceErrors;
        $this->updates = new MedTivaServiceUpdates($this->gameSession);
        $this->actions = new MedTivaServiceActions($this->gameSession, $this->errors);
    }

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
        $player->data = (new MedTivaPlayerData([
            'gold' => 100,
        ]))->toArray();
        $player->save();
        $field = $this->gameSession->mapFields()->getQuery()->where('base_type', MedTivaFieldBaseType::PLAIN)->inRandomOrder()->first();
        $field->base_type = MedTivaFieldBaseType::CITY;
        $data = new MedTivaCityData([]);
        $data->player_id = $player->id;
        $data->buildings->hut->level = 1;
        $field->data = $data->toArray();
        $field->save();
    }

    public function getFieldsHook(MapField $field): array
    {
        $player = player();
        if ($player === null) return [$field];
        if (!array_key_exists('player_id', $field->data) || $field->data['player_id'] === $player->id) return [$field];
        $field->data = [
            'hidden' => true
        ];
        return [
            $field,
        ];
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

    public function update()
    {
        $update_buffer = new MedTivaUpdateBuffer($this->gameSession);
        $update_buffer->fields->each(function (MapField $field) use ($update_buffer) {
            $this->updates->updateField($field, $update_buffer);
        });
        $update_buffer->players->each(function (Player $player) use ($update_buffer) {
            $this->updates->updatePlayer($player, $update_buffer);
        });
        $update_buffer->players->each(function (Player $player) {
            $player->save();
        });
        $update_buffer->fields->each(function (MapField $field) {
            $field->save();
        });
    }



    public function handleAction(Player $player, string $action_type, array $action_data): JsonResponse
    {
        switch ($action_type) {

            case 'build':
                return $this->actions->handleBuild(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['building'] ?? ''
                );

            case 'recruit':
                return $this->actions->handleRecruit(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['unit'] ?? '',
                    $action_data['amount'] ?? 0
                );

            case 'move':
                return $this->actions->handleMove(
                    $player,
                    $action_data['x'] ?? 0,
                    $action_data['y'] ?? 0,
                    $action_data['target_x'] ?? 0,
                    $action_data['target_y'] ?? 0,
                    new MedTivaUnitBagData($action_data['units'] ?? [])
                );
        }
        return $this->errors->error('Invalid action_type', ['action_type' => $action_type]);
    }
}
