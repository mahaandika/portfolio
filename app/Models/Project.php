<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'description',
        'thumbnail',
        'url_link',
        'github_link',
        'tech_stack',
    ];

    /**
     * Casting atribut ke tipe data tertentu.
     */
    protected $casts = [
        'tech_stack' => 'array', // Otomatis mengubah JSON menjadi Array PHP
    ];

    /**
     * Relasi: Project dimiliki oleh satu Kategori.
     * * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Relasi: Project memiliki banyak gambar galeri.
     * * @return HasMany
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }
}