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
        @forelse($gameSessions as $gameSession) 
            <x-item-card>
                
            </x-item-card>
        @empty
            <x-item-card>
                No Sessions Active
            </x-item-card>
        @endforelse

        <div class="p-2 border-2 border-gray-800 m-2 rounded">
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
        </div>
    </x-central-screen>
</x-guest-layout>