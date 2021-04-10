<?php
use \App\Models\GameSession;

/**
 * @var GameSession $gameSession
 **/ 

$th_class = "p-1 border-2 border-gray-600 w-32 text-left";
$td_class = "p-1 border-2 border-gray-400 font-bold text-center";
?>


<x-guest-layout>
    <x-central-screen>
        <x-page-title>
            Game Lobby : {{$gameSession->name}}
        </x-page-title>

        <x-input-validation-error-section>
        </x-input-validation-error-section>

        <x-section>
            <h3>
                Session Status:
            </h3>
            <table class="table-auto border-collapse rounded">
                <tbody>
                    <tr>
                        <td class="{{$th_class}}" scope="col">Game</td>
                        <td class="{{$td_class}}">{{$gameSession->game_type}}</td>
                    </tr>
                    <tr>
                        <td class="{{$th_class}}" scope="col">Running since</td>
                        <td class="{{$td_class}}">{{$gameSession->created_at->format('d-m-Y H:i')}}</td>
                    </tr>
                    <tr>
                        <td class="{{$th_class}}" scope="col">Players</td>
                        <td class="{{$td_class}}">{{$gameSession->players()->count()}} / {{$gameSession->max_players}}</td>
                    </tr>
                    <tr>
                        <td class="{{$th_class}}" scope="col">Session Link</td>
                        <td class="{{$td_class}}">{{$gameSession->session_token}}</td>
                    </tr>
                </tbody>
            </table>
        </x-section>

        <x-section>
            <h3>
                Players in Lobby
            </h3>
            <ul>
                @forelse ($gameSession->players as $index => $player)
                    <li class="flex flex-nowrap">
                        <x-player-avatar :player="$player"></x-player-avatar>
                        <h4 class="flex justify-center items-center px-2 text-l font-bold">{{$player->display_name}}</h4>
                    </li>
                @empty
                    <li>
                        No Players joined
                    </li>
                @endforelse
            </ul>
            <form method="POST" 
                action="{{route("game-sessions.join", ['gameSession' => $gameSession->id])}}"
                class="flex flex-row border-t-2 border-gray-800"
                >        
                @csrf        
                <label class="w-1/3">
                    Display Name
                    <input name="display_name" type="text" value="Anon" class="w-full">
                </label>
                <label class="w-1/3">
                    Password
                    <input name="password" type="password" placeholder="secure" class="w-full">
                </label>
                <div class="flex w-1/3 justify-center items-center">
                    <x-button class="w-16 h-8">
                        Join
                    </x-button>
                </div>
            </form>
        </x-section>
    </x-central-screen>
</x-guest-layout>

