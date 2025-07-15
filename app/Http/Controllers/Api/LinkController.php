<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Link;
use Illuminate\Support\Str;


class LinkController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'url' => ['required', 'url:http,https'],
        ]);

        do {
            $short_code = Str::random(6);
        } while (Link::where('short_code', $short_code)->exists());

        $link = Link::create([
            'original_url' => $request->url,
            'short_code' => $short_code,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'short_url' => url($link->short_code)
        ], 201);
    }

    public function redirect(string $short_code)
    {
        $link = Link::where('short_code', $short_code)->firstOrFail();

        $link->increment('visits');

        return redirect()->away($link->original_url);
    }

    public function destroy(Request $request, Link $link)
    {
        if ($request->user()->id !== $link->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $link->delete();

        return redirect()->back()->with('success', 'Link excluído com sucesso!');
    }
}
