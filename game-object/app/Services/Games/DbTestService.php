<?php


namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\GameVariable;
use App\Models\MapField;
use App\Models\Player;
use App\Services\Games\GameService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\ParameterBag;

class DbTestService extends GameService
{
    public function newGame(ParameterBag $parameters)
    {
        $field_types = ["low", "med", "high",];
        for ($x = 0; $x < 5; ++$x) {
            for ($y = 0; $y < 5; ++$y) {
                $field = MapField::create([
                    'x' => $x,
                    'y' => $y,
                    'base_type' => random_int(0, count($field_types) - 1),
                    'data' => [],
                    'game_session_id' => $this->gameSession->id,
                ]);
            }
        }
    }

    public function newPlayer(Player $player, ParameterBag $parameters)
    {
        $this->gameSession->gameVariables()->save(
            new GameVariable([
                'key' => "player_{$player->id}",
                'value' => [
                    'points' => 0
                ]
            ])
        );
    }

    public function handle(Player $player, ParameterBag $parameters): JsonResponse
    {
        $action_type = $parameters->get('action');
        $action_data = $parameters->get('action_data');
        switch ($action_type) {
            case 'score':
                return $this->handleScore($player, $action_data);
        }
        return response()->json([
            'success' => false,
            'reason' => 'Unknown action_type ' . $action_type,
        ]);
    }

    public function handleAction(Player $player, string $action_type, array $action_data): JsonResponse
    {
        return response()->json();
    }

    public function handleScore(Player $player, array $action_data): JsonResponse
    {
        $validator = Validator::make($action_data, [
            'player_id' => ['required', 'exists:players,id'],
        ])->validate();

        $variable_key = 'player_' . $validator['player_id'];
        $variable = $this->gameSession->gameVariables()
            ->getQuery()
            ->where('key', $variable_key)
            ->first(['id', 'value']);
        if ($variable === null) {
            return response()->json([
                'success' => false,
                'reason' => 'Invalid gamestate'
            ]);
        }
        $value = $variable->value;
        $value['points']++;
        $variable->value = $value;
        $variable->save();

        return response()->json([
            'success' => true,
            'data' => [
                'points' => $variable->value['points'],
            ]
        ]);
    }

    public function update()
    {
        $points = $this->gameSession->gameVariables()->where('key', 'like', 'player_%')->get(['id', 'value']);
        foreach ($points as $pointVar) {
            $value = $pointVar->value;
            $value['points']--;
            $pointVar->value = $value;
            $pointVar->save();
        }
    }
}
