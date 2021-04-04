<?php

use App\Http\Controllers\GameSessionController;
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


Route::group([], function () {
    /**
     * Games
     */

    Route::get('game-session/{gameSession}', [GameSessionController::class, 'show'])
        ->whereNumber('gameSession')
        ->name('game-sessions.show');
    Route::get('game-session', [GameSessionController::class, 'index'])
        ->name('game-sessions');
    Route::get('game-session/create', [GameSessionController::class, 'create'])
        ->name('game-sessions.create');
    Route::post('game-session/store', [GameSessionController::class, 'store'])
        ->name('game-sessions.store');
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
