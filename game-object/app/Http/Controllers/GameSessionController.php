<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use App\Models\Player;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GameSessionController extends Controller
{
    //

    public function index()
    {
        return view('game-sessions.index', [
            'gameSessions' => GameSession::query()->where('is_private', false)->get(),
        ]);
    }

    public function show(GameSession $gameSession)
    {
        $player = player();
        // dd($player);
        // dd($gameSession->players()->where('id', $player->id)->count());
        return view('game-sessions.show', [
            'gameSession' => $gameSession,
            'canJoin' => $player === null || $gameSession->players()->where('id', $player->id)->count() === 0,
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

    public function join(GameSession $gameSession, Request $request)
    {
        $parameters = $this->validate($request, [
            'display_name' => [
                'min:2',
                'max:31',
                'alpha_num',
                Rule::unique('players')->where(function ($query) use ($gameSession) {
                    return $query->where('game_session_id', $gameSession->id);
                })
            ],
            'password' => ['min:8', 'max:63', 'notRegex:/^([0-9]*|[a-z]*|[A-Z]*)$/']
        ]);

        if ($gameSession->players()->count() >= $gameSession->max_players) {
            return redirect()->route('game-sessions.show', [
                'gameSession' => $gameSession,
            ])->withErrors('Lobby is already full');
        }

        $auth_token = session("auth_token", null);

        if (!$auth_token) session()->put("auth_token", $auth_token = Str::uuid());

        $player = new Player();
        $player->display_name = $parameters['display_name'];
        $player->password = $parameters['password'];
        $player->avatar_id = hexdec(substr(md5($parameters['display_name']), 0, 4)) & 0x7fff;
        $player->auth_token = $auth_token;
        $gameSession->players()->save($player);

        return redirect()->route('game-sessions.show', [
            'gameSession' => $gameSession
        ]);
    }

    public function join_via_session_token(string $sessionToken, Request $request)
    {
        $game_session = GameSession::query()->where('session_token', $sessionToken)->firstOrFail();
        return $this->join($game_session, $request);
    }

    public function getGameSession(GameSession $gameSession)
    {
        $this->authorize('view', $gameSession);
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $gameSession->id,
                'game_type' => $gameSession->game_type,
                'session_token' => $gameSession->session_token,
                'players' => $gameSession->players->pluck("display_name")->all(),
            ]
        ]);
    }

    public function getData(GameSession $gameSession, Request $request)
    {
        $this->authorize('view', $gameSession);
        $parameters = $request->validate([
            'variables' => ['array']
        ]);

        $variables = $gameSession->gameVariables()->whereIn('key', $parameters['variables'])->get('key', 'value')->all();
        return response()->json([
            'success' => true,
            'data' => $variables
        ]);
    }

    public function getFields(GameSession $gameSession, Request $request)
    {
        $this->authorize('view', $gameSession);
        $parameters = $request->validate([
            'fields' => ['array'],
            'fields.x' => ['required', 'numeric'],
            'fields.y' => ['required', 'numeric'],
        ]);

        $query = $gameSession->mapFields()->select('x', 'y', 'base_type', 'base_type');

        foreach ($parameters['fields'] as $field) {
            $query->orWhere(function (Builder $query) use ($field) {
                return $query
                    ->where('x', $field['x'])
                    ->where('y', $field['y']);
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->get()->all()
        ]);
    }
}
