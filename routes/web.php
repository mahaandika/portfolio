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
        Route::get('/admin/projects/create', [ExperienceController::class, 'create']);
        Route::post('/admin/projects', [ExperienceController::class, 'store']);

        Route::resource('categories', CategoryController::class);
        Route::get('/admin/categories/create', [CategoryController::class, 'create']);
        Route::post('/admin/categories', [CategoryController::class, 'store']);
        Route::get('/admin/categories/{id}/edit', [CategoryController::class, 'edit']);
        Route::put('/admin/categories/{id}', [CategoryController::class, 'update']);
        Route::delete('/admin/categories/{id}', [CategoryController::class, 'destroy']);

        Route::resource('experiences', ExperienceController::class);
        Route::get('/admin/experiences/create', [ExperienceController::class, 'create']);
        Route::post('/admin/experiences', [ExperienceController::class, 'store']);
        Route::get('/admin/experiences/{id}/edit', [ExperienceController::class, 'edit']);
        Route::put('/admin/experiences/{id}', [ExperienceController::class, 'update']);
        Route::delete('/admin/experiences/{id}', [ExperienceController::class, 'destroy']);
    });
});

require __DIR__.'/settings.php';
// require __DIR__.'/auth.php'; // Pastikan auth juga ter-load jika diperlukan