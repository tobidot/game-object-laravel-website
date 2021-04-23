<?php

use App\Http\Controllers\GameSessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => ['player:required'],
], function () {
    Route::post('game-sessions/{gameSession}/me', [GameSessionController::class, 'getMe'])
        ->whereNumber('gameSession');
    Route::post('game-sessions/{gameSession}/players', [GameSessionController::class, 'getPlayers'])
        ->whereNumber('gameSession');
    Route::post('game-sessions/{gameSession}/fields', [GameSessionController::class, 'getFields'])
        ->whereNumber('gameSession');
    Route::post('game-sessions/{gameSession}/data', [GameSessionController::class, 'getData'])
        ->whereNumber('gameSession');
    Route::post('game-sessions/{gameSession}/action', [GameSessionController::class, 'playerAction'])
        ->whereNumber('gameSession');
    Route::post('game-sessions/{gameSession}', [GameSessionController::class, 'getGameSession'])
        ->whereNumber('gameSession');
    Route::post('/user', function (Request $request) {
        return response()->json([
            'success' => true,
            'player' => player(),
        ]);
    });
});
