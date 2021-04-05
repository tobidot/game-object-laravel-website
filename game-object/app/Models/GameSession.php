<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function mapFields(): HasMany
    {
        return $this->hasMany(MapField::class);
    }
}
