let mix = require('laravel-mix');

mix.sass('src/style.scss', 'public/dist').js('src/app.js', 'public/dist');