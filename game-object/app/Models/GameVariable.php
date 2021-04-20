<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\GameVariable
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $game_session_id
 * @property string $key
 * @property array $value
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable query()
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereGameSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|GameVariable whereValue($value)
 * @mixin \Eloquent
 */
class GameVariable extends Model
{
    use HasFactory;

    protected $casts = [
        "value" => "array"
    ];

    protected $fillable = [
        "key",
        "value",
        "game_session_id"
    ];
}
