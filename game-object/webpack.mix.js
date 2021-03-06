const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .ts('resources/ts/games/med-tiva/index.ts', 'public/games/med-tiva')
    .sourceMaps()
    .sass('resources/ts/games/med-tiva/style.scss', 'public/games/med-tiva')
    .copy('resources/ts/games/med-tiva/index.html', 'public/games/med-tiva')
    .copy('resources/ts/games/med-tiva/images', 'public/games/med-tiva/images')
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ]);
