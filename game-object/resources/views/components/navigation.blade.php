<?php 

?>

@props([
    /**
     * @var array $items 
     *  [0] => Display Name
     *  [1] => Route-Name
     **/
    'items' => [], 
])

<nav x-data="{ open: false }" class="bg-white border-b border-gray-100">
    <!-- Primary Navigation Menu -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
            <div class="flex">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="{{ route('dashboard') }}">
                        <x-application-logo class="block h-10 w-auto fill-current text-gray-600" />
                    </a>
                </div>

                <!-- Navigation Links -->
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                    @foreach ($items as [$display, $route])
                        <x-nav-link :href="route($route)" :active="request()->routeIs($route)">
                            {{ $display }}
                        </x-nav-link>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <!-- Responsive Navigation Menu -->
    <div :class="{'block': open, 'hidden': ! open}" class="hidden sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
            @foreach ($items as [$display, $route])
                <x-responsive-nav-link :href="route($route)" :active="request()->routeIs($route)">
                    {{ $display }}
                </x-responsive-nav-link>
            @endforeach
        </div>
    </div>
</nav>
