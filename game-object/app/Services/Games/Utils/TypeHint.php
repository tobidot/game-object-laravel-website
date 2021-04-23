<?php

namespace App\Services\Games\Utils;

class TypeHint
{
    public function toArray(): array
    {
        $array = array_map(function ($item) {
            if ($item instanceof TypeHint) {
                return $item->toArray();
            }
            return $item;
        }, (array) $this);
        return $array;
    }
}
