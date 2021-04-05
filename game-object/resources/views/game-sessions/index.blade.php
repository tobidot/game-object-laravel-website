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

        @if ($errors->any())
            <x-section>
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </x-section>
        @endif

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
                    <option value="gogo-bum">Gogo Bum</option>
                </select>
                <div class="py-2">
                    <x-button>
                        Create New Game
                    </x-button>
                </div>
            </form>
        </x-section>

        

        </x-section>
            <ul>
                @forelse($gameSessions as $gameSession) 
                    <x-item-card>
                        <x-slot name="title">
                            {{$gameSession->name}}
                        </x-slot>
                        <x-slot name="title_info">
                            {{$gameSession->game_type}}
                        </x-slot>
                        kuju
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