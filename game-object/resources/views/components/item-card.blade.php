<?php 
?>

@props([
])

<li class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
    <div class="flex flex-col">
        @isset($title)
            <h2 class="text-2xl">
                <span>                
                    {{ $title }}
                </span>
                @isset($title_info)
                <span class="text-m">
                    {{ $title_info }}
                </span>            
                @endisset
            </h2>
        @endisset
        <summary>
            {{ $slot }}
        </summary>
    </div>
</summary>