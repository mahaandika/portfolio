<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi (mass assignable).
     */
    protected $fillable = [
        'name',
        'slug',
        'status',
    ];

    /**
     * Relasi: Satu Kategori memiliki banyak Project.
     * * @return HasMany
     */
    public function projects(): HasMany
    {
        // Category hasMany Project
        return $this->hasMany(Project::class);
    }
}