<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
