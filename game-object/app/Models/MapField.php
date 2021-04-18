<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MapField
 *
 * @property int $id
 * @property int $game_session_id
 * @property int $x
 * @property int $y
 * @property int $base_type
 * @property array $data
 * @method static \Illuminate\Database\Eloquent\Builder|MapField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MapField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MapField query()
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereBaseType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereGameSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereX($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MapField whereY($value)
 * @mixin \Eloquent
 */
class MapField extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'x',
        'y',
        'base_type',
        'data',
        'game_session_id',
    ];

    protected $casts = [
        'data' => 'array'
    ];
}
