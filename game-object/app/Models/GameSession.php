<?php

namespace App\Models;

use App\Exceptions\GoInvalidGameTypeException;
use App\Services\Games\GameService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Str;
use Throwable;

/**
 * App\Models\GameSession
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property string $game_type
 * @property string $session_token
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\MapField[] $mapFields
 * @property-read int|null $map_fields_count
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereGameType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereSessionToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameSession whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class GameSession extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'array',
        'last_update_step_at' => 'datetime',
    ];

    protected ?GameService $gameService = null;

    public function mapFields(): HasMany
    {
        return $this->hasMany(MapField::class);
    }

    public function gameVariables(): HasMany
    {
        return $this->hasMany(GameVariable::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function getGameService(): GameService
    {
        if ($this->gameService) return $this->gameService;
        $game_service_class = 'App\\Services\\Games\\' . Str::studly($this->game_type) . 'Service';
        try {
            $game_service = App::make($game_service_class);
        } catch (Throwable $e) {
            $game_service = null;
        }
        if ($game_service === null) throw new GoInvalidGameTypeException($this->game_type, $game_service_class);
        $game_service->gameSession = $this;
        return $this->gameService = $game_service;
    }
}
