<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Api\LinkController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('link-shortener', function () {
        return Inertia::render('link-shortener');
    })->name('link-shortener');
});


Route::get('/{short_code}', [LinkController::class, 'redirect']);