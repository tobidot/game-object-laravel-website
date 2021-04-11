<?php 
/**
 * @var Collection $gameSessions
**/
?>

<x-guest-layout>
    <x-central-screen>
        <x-page-title>
            Lobby List
        </x-page-title>

        <x-input-validation-error-section>
        </x-input-validation-error-section>

        <x-section>
            <form 
            method="POST"
            action="{{route("game-sessions.store")}}" 
            class="flex flex-col">
                @csrf
                <label for="name">
                    Session Name
                </label>
                <input required id="name" type="text" name="name">
                <label for="name">
                    Game
                </label>
                <select required id="game_type" name="game_type">
                    @foreach ([
                        "db-test" => "DB Test",
                        "memory" => "Memory",
                    ] as $value => $display)
                        <option value="{{$value}}">{{$display}}</option>
                    @endforeach
                </select>
                <div class="py-2">
                    <x-button>
                        Create New Game
                    </x-button>
                </div>
            </form>
        </x-section>


        <x-section>
            <ul>
                @forelse($gameSessions as $gameSession) 
                <x-item-card>
                        <x-slot name="title">
                            {{$gameSession->name}}
                        </x-slot>
                        <x-slot name="title_info">
                            {{$gameSession->game_type}}
                        </x-slot>
                        <a href="{{route("game-sessions.show", ['gameSession' => $gameSession->id])}}">
                            <x-button>Open</x-button>
                        </a>
                    </x-item-card>
                @empty
                    <x-item-card>
                        <x-slot name="title">
                            No Sessions Active
                        </x-slot>
                    </x-item-card>
                @endforelse
            </ul>
        </x-section> 
    </x-central-screen>
</x-guest-layout>