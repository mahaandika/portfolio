<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExperienceController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Halaman Depan Publik
Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

// Grup Route yang Memerlukan Login
Route::middleware(['auth', 'verified'])->group(function () {
    /**
     * Manajemen Portfolio (Prefix Admin)
     * Menggunakan Route Resource untuk CRUD otomatis
     */
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::inertia('dashboard', 'admin/dashboard')->name('dashboard');
        Route::resource('projects', ProjectController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('experiences', ExperienceController::class);
    });
});

require __DIR__.'/settings.php';
// require __DIR__.'/auth.php'; // Pastikan auth juga ter-load jika diperlukan