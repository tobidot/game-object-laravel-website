<?php

namespace App\Services\Games\MedTiva\ServiceExtension;

use Illuminate\Http\JsonResponse;

class MedTivaServiceErrors
{

    public function error(string $reason, array $details = [])
    {
        return response()->json([
            'success' => false,
            'reason' => $reason,
            'details' => $details,
        ]);
    }

    public function notImplemented(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'reason' => 'Action not implemented',
        ]);
    }

    public function gameplay(string $reason, array $details = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'reason' => 'Unable to perform that action right now',
            'details' => array_merge(['message' => $reason, $details]),
        ]);
    }

    public function invalidField(int $x, int $y): JsonResponse
    {
        return $this->error(
            'Field is not a valid target or does not exist',
            [
                'x' => $x,
                'y' => $y,
            ]
        );
    }

    public function invalidUnitType(string $unit_type): JsonResponse
    {
        return $this->error(
            'Unittype is not valid for this action or does not exist',
            [
                'unit_type' => $unit_type,
            ]
        );
    }

    public function invalidArgument(string $message, $received): JsonResponse
    {
        return $this->error(
            'Invalid argument: ' . $message,
            [
                'received' => $received,
            ]
        );
    }
}
