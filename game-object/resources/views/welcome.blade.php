<x-guest-layout>
    <x-central-screen>
        <h1 class="text-3xl font-bold">Welcome</h1>
        <ul>
        @foreach( [
            "Ants Simulation" => asset('games/ants-simulation/index.html'),
            "Memory Game" => asset('games/memory/index.html'),
            "Menues Demo" => asset('games/menues/index.html'),
            "Zahlen Raten" => asset('games/zahlen-raten/index.html'),
        ] as $title => $url) 
            <x-item-card>
                Open <a href="{{$url}}" target="_blank">{{$title}}</a>
            </x-item-card>
        @endforeach
        </ul>
    </x-central-screen>
</x-guest-layout>