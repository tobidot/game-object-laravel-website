<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GameSessionController extends Controller
{
    //

    public function index()
    {
        return view('game-sessions.index', [
            'gameSessions' => GameSession::query()->get(),
        ]);
    }

    public function show(GameSession $gameSession)
    {
        return view('game-sessions.show', [
            'gameSession' => $gameSession,
            'message' => session()->get('message') ?? '',
        ]);
    }

    public function create(Request $request)
    {
        return view('game-session.create', []);
    }

    public function store(Request $request)
    {
        $validated = $this->validate($request, [
            'name' => ['required', 'regex:/([a-zA-Z0-9])+/'],
            'game_type' => ['required']
        ]);

        $session_token = Str::uuid();

        $gameSession = new GameSession();
        $gameSession->name = $validated['name'];
        $gameSession->game_type = $validated['game_type'];
        $gameSession->session_token = $session_token;
        $gameSession->save();

        session()->flash('message', 'Created new GameSession');

        return redirect()->route('game-sessions.show', [
            'gameSession' => $gameSession
        ]);
    }
}
