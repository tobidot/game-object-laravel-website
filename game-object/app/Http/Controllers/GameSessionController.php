<?php

namespace App\Http\Controllers;

use App\Models\GameSession;
use App\Models\Player;
use App\Services\DbTestService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GameSessionController extends Controller
{
    //

    public function index()
    {
        DB::select(DB::raw("SELECT * from `game_sessions`"));
        DB::table('game_sessions')->select()->get()->first();
        return view('game-sessions.index', [
            'gameSessions' => GameSession::query()->where('is_private', false)->get(),
        ]);
    }

    public function show(GameSession $gameSession)
    {
        $player = player();
        return view('game-sessions.show', [
            'gameSession' => $gameSession,
            'canJoin' => $player === null || $gameSession->players()->where('id', $player->id)->count() === 0,
            'messages' => session()->get('messages') ?? '',
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
        DB::transaction(function () use ($validated, $session_token, $request, $gameSession) {
            $gameSession->name = $validated['name'];
            $gameSession->game_type = $validated['game_type'];
            $gameSession->session_token = $session_token;
            $gameSession->last_update_step_at = now();
            $gameSession->data = [];
            $gameSession->save();
            $gameSession->getGameService()->newGame($request->json());
        });

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
        DB::transaction(function () use ($parameters, $auth_token, $gameSession, $request, $player) {
            $player->display_name = $parameters['display_name'];
            $player->password = $parameters['password'];
            $player->avatar_id = hexdec(substr(md5($parameters['display_name']), 0, 4)) & 0x7fff;
            $player->auth_token = $auth_token;
            $player->data = [];
            $gameSession->players()->save($player);
            $gameSession->getGameService()->newPlayer($player, $request->json());
        });

        return redirect()->route('game-sessions.show', [
            'gameSession' => $gameSession
        ]);
    }

    public function joinViaSessionToken(string $sessionToken, Request $request)
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

    public function getPlayers(GameSession $gameSession, Request $request)
    {
        $this->authorize('view', $gameSession);

        $players = $gameSession->players()->get(['display_name', 'id'])->all();
        return response()->json([
            'success' => true,
            'data' => $players
        ]);
    }

    public function getMe(GameSession $gameSession)
    {
        $this->authorize('view', $gameSession);
        $player = player();
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $player->id,
                'display_name' => $player->display_name,
                'data' => $player->data,
            ]
        ]);
    }

    public function getData(GameSession $gameSession, Request $request)
    {
        $this->authorize('view', $gameSession);
        $parameters = $request->validate([
            'variables' => ['array']
        ]);

        $variables = $gameSession->gameVariables()
            ->whereIn('key', $parameters['variables'])
            ->get(['key', 'value'])
            ->all();

        $data = [];
        foreach ($parameters['variables'] as $variable_name) {
            $data[$variable_name] = null;
        }
        foreach ($variables as $variable) {
            $data[$variable->key] = $variable->value;
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function getFields(GameSession $gameSession, Request $request)
    {
        $this->authorize('view', $gameSession);
        $parameters = $request->validate([
            'fields' => ['array'],
            'fields.*.x' => ['required', 'numeric'],
            'fields.*.y' => ['required', 'numeric'],
        ]);

        /** @var Builder $query */
        $query = $gameSession->mapFields()->select('x', 'y', 'base_type', 'data');

        $query->where(function (Builder $query) use ($parameters) {
            foreach ($parameters['fields'] as $field) {
                $query->orWhere(function (Builder $query) use ($field) {
                    return $query
                        ->where('x', $field['x'])
                        ->where('y', $field['y']);
                });
            }
        });

        $data = $query->get()->flatMap([$gameSession->getGameService(), 'getFieldsHook']);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function playerAction(GameSession $gameSession, Request $request)
    {
        $player = player();
        return $gameSession->getGameService()->handle($player, $request->json());
    }
}
