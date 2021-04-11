@props([
    'player'
])

<?php 
    $color_pallete = [
    "#ff0000",
    "#00ffff",
    "#ffff00",
    "#0000ff",
    "#ff00ff",
];
    srand ( $player->avatar_id );
    $color_max = count($color_pallete)-1;
    $feature1 = mt_rand(0,1);
    $color1 = $color_pallete[ mt_rand(0,$color_max)];
    $feature2 = mt_rand(0,1);
    $color2 = $color_pallete[ mt_rand(0,$color_max)];
    $feature3 = mt_rand(0,1);
    $cid3 = mt_rand(0,$color_max);
    $color3 = $color_pallete[ $cid3 ];
    $off_color3 = $color_pallete[ ($cid3+1) % $color_max];
?>
  
<svg viewBox="0 0 100 100" class="h-12 w-12 border border-black rounded-sm bg-white">

    <x-dynamic-component :component='"player-avatar-features.level-1.$feature1"' :color="$color1">
    </x-dynamic-component>
    <x-dynamic-component :component='"player-avatar-features.level-2.$feature2"' :color="$color2">
    </x-dynamic-component>
    <x-dynamic-component :component='"player-avatar-features.level-3.$feature3"' :color="$color3" :off-color3="$off_color3">
    </x-dynamic-component>
    <rect x="0" y="65" width="100" height="35" fill="#aaaaaa" rx="5"/>
    <text x="95" y="100" font-size="24" stroke="black" style="
    text-anchor: end;
    dominant-baseline: ideographic;
    vertical-align: bottom;
    ">{{$player->avatar_id}}</text>

</svg>