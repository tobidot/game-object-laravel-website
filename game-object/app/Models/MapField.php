<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MapField extends Model
{
    use HasFactory;

    public $casts = [
        'data' => 'json'
    ];
}
