<?php


namespace App\Services\Games;

use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\GameService;
use Symfony\Component\HttpFoundation\ParameterBag;
use App\Services\Games\MedTiva\MedTivaCityData;
use App\Services\Games\MedTiva\MedTivaFieldBaseType;

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
        $player->data = [
            'action_points' => 20,
            'max_action_points' => 20,
            'gold' => 0,
            'score' => 0,
        ];
        $player->save();
    }

    public function handle(Player $player, ParameterBag $parameters)
    {
    }

    public function update()
    {
    }

    protected function newField(int $x, int $y): MapField
    {
        $base_type = random_int(0, count(MedTivaFieldBaseType::ALL) - 1);
        switch ($base_type) {
            case MedTivaFieldBaseType::CITY:
                $data = (array) new MedTivaCityData([]);
                break;
            case MedTivaFieldBaseType::CAVE:
                $data = [
                    'ticks_until_spawn' => 0,
                    'danger_level' => random_int(0, 9)
                ];
                break;
            default:
            case MedTivaFieldBaseType::PLAIN:
                $data = [];
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
