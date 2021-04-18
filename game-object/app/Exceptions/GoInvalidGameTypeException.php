<?php

namespace App\Exceptions;

use Exception;

class GoInvalidGameTypeException extends Exception
{
    public function __construct(string $game_type, string $service_class)
    {
        parent::__construct("Invalid Gametype: $game_type, Service class could not be found: $service_class");
    }
}
