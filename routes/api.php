<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\LinkController;

use Illuminate\Http\Request;

// Rotas que não precisam de autenticação (ex: login, registro)
// Route::post('/login', ...);

// Rotas que PRECISAM de autenticação
Route::middleware('auth:sanctum')->group(function () {
    // A rota para buscar o usuário autenticado (comum em SPAs)
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Sua rota para criar o link
    Route::post('/links', [LinkController::class, 'store']);
});

// Sua rota de redirecionamento pode ser pública
Route::get('/{short_code}', [LinkController::class, 'redirect']);