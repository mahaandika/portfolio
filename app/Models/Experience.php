<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'company',
        'position',
        'start_date',
        'end_date',
        'is_current',
        'description',
    ];

    /**
     * Casting atribut ke tipe data tertentu.
     * Mengubah string date dari DB menjadi objek Carbon/Date.
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date'   => 'date',
        'is_current' => 'boolean',
    ];
}