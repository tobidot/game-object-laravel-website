@props([
    'player'
])

<?php 
    $color_pallete = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
];
    srand ( $player->avatar_id );
    $feature1 = mt_rand(0,1);
    $color1 = $color_pallete[ mt_rand(0,count($color_pallete)-1)];
    $feature2 = mt_rand(0,1);
    $color2 = $color_pallete[ mt_rand(0,count($color_pallete)-1)];
    $feature3 = mt_rand(0,1);
    $color3 = $color_pallete[ mt_rand(0,count($color_pallete)-1)];
?>
  
<svg viewBox="0 0 100 100" class="h-8 w-8">

    <x-dynamic-component :component='"player-avatar-features.level-1.$feature1"' :color="$color1">
    </x-dynamic-component>
    <x-dynamic-component :component='"player-avatar-features.level-2.$feature2"' :color="$color2">
    </x-dynamic-component>
    
    <text x="100" y="100" font-size="4" style="
    text-anchor: end;
    dominant-baseline: bottom;
    ">{{$player->avatar_id}}</text>

</svg>