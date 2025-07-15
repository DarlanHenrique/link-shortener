<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = [
        'original_url',
        'short_code',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
