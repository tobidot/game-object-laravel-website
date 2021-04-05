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
                        <td class="{{$td_class}}">1 / 1</td>
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

            </h3>
        </x-section>
    </x-central-screen>
</x-guest-layout>

