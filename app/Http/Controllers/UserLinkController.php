<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Inertia\Response;

class UserLinkController extends Controller
{
    public function index(Request $request): Response
    {
        $links = $request->user()->links()->latest()->get();

        return Inertia::render('MyLinksPage', [
            'links' => $links,
        ]);
    }
}