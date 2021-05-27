<?php

namespace App\Services\Games\MedTiva\Consts;


class MedTivaFieldBaseType
{
    public const PLAIN = 0;
    public const CITY = 1;
    public const CAVE = 2;

    public const ALL = [
        self::PLAIN => "plain",
        self::CITY => "city",
        self::CAVE => "cave"
    ];

    public static function toNumber(string $value): int
    {
        return array_search($value, self::ALL);
    }
}
