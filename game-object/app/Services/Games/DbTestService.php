<?php


namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\GameVariable;
use App\Models\Player;
use App\Services\Games\GameService;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\ParameterBag;

class DbTestService extends GameService
{

    public function __construct()
    {
    }

    public function newGame(ParameterBag $parameters)
    {
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

    public function handle(Player $player, ParameterBag $parameters)
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

    public function handleScore(Player $player, array $action_data)
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
}
