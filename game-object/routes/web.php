<?php

use App\Http\Controllers\GameSessionController;
use App\Http\Controllers\PlayerController;
use App\Models\GameSession;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([], function () {
    /**
     * Public Pages
     */

    Route::get('/', function () {
        return view('welcome');
    });
});


Route::group([
    'middleware' => ['player']
], function () {
    /**
     * Games
     */

    Route::get('game-sessions/{gameSession}', [GameSessionController::class, 'show'])
        ->whereNumber('gameSession')
        ->name('game-sessions.show');
    Route::post('game-sessions/{gameSession}/join/', [GameSessionController::class, 'join'])
        ->whereNumber('gameSession')
        ->name('game-sessions.join');
    Route::get('game-sessions', [GameSessionController::class, 'index'])
        ->name('game-sessions');
    Route::get('game-sessions/create', [GameSessionController::class, 'create'])
        ->name('game-sessions.create');
    Route::post('game-sessions/store', [GameSessionController::class, 'store'])
        ->name('game-sessions.store');

    Route::post('players/{player}/authenticate', [PlayerController::class, 'authenticate'])
        ->whereNumber('player')
        ->name('players.authenticate');
});


Route::group([], function () {
    /**
     * Backend
     */
    Route::get('/dashboard', function () {
        return view('dashboard');
    })
        ->middleware(['auth'])
        ->name('dashboard');
});

require __DIR__ . '/auth.php';
