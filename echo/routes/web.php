<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return File::get(public_path('vue/index.html'));
})->where('any', '.*');
