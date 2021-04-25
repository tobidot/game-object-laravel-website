<?php

namespace App\Services\Games;

use App\Models\GameSession;
use App\Models\Player;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\ParameterBag;
use Throwable;

abstract class GameService
{
    public GameSession $gameSession;

    public function __construct(GameSession $gameSession)
    {
        $this->gameSession = $gameSession;
    }

    public abstract function newGame(ParameterBag $parameters);

    public abstract function newPlayer(Player $player, ParameterBag $parameters);

    public function handle(Player $player, ParameterBag $parameters): JsonResponse
    {
        $action_type = $parameters->get('action');
        $action_data = $parameters->get('action_data', []);
        return $this->handleAction($player, $action_type, $action_data);
    }

    public abstract function handleAction(Player $player, string $action_type, array $action_data): JsonResponse;

    public abstract function update();

    public function iregularUpdate()
    {
        try {
            /** @var Carbon $last_update_step_at */
            $last_update_step_at = $this->gameSession->last_update_step_at;
            $now = now();
            $steps = $last_update_step_at->diffInMinutes($now);
            for ($i = 0; $i < $steps; $i++) {
                $this->update();
            }
            $this->gameSession->last_update_step_at = $now;
            $this->gameSession->save();
        } catch (Throwable $exception) {
            Log::error('Updateing game failed', [
                'game_session_id' => $this->gameSession->id,
                'game_type' => $this->gameSession->game_type,
                'exception' => $exception,
            ]);
        }
    }
}
