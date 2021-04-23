<?php


namespace App\Services\Games;

use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\GameService;
use App\Services\Games\MedTiva\MedTivaCaveData;
use Symfony\Component\HttpFoundation\ParameterBag;
use App\Services\Games\MedTiva\MedTivaCityData;
use App\Services\Games\MedTiva\MedTivaFieldBaseType;
use App\Services\Games\MedTiva\MedTivaPlainData;
use App\Services\Games\MedTiva\MedTivaPlayerData;
use App\Services\Games\MedTiva\MedTivaUpdateBuffer;
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

    public function handle(Player $player, ParameterBag $parameters)
    {
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
}
