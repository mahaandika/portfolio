<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Menampilkan daftar kategori.
     */
    public function index(): Response
    {
        // Mengambil semua data kategori dari database
        $categories = Category::latest()->get();

        // Merender view yang berlokasi di Pages/Admin/Categories/Index.tsx
        return Inertia::render('admin/categories/index', [
            'categories' => $categories
        ]);
    }

    /**
     * Menampilkan form untuk membuat kategori baru.
     */
    public function create(): Response
    {
        return Inertia::render('admin/categories/create');
    }

    /**
     * Menampilkan detail kategori (jika diperlukan).
     */
    public function show(Category $category): Response
    {
        return Inertia::render('admin/categories/show', [
            'category' => $category
        ]);
    }

    /**
     * Menampilkan form edit kategori.
     */
    public function edit(Category $category): Response
    {
        return Inertia::render('admin/categories/edit', [
            'category' => $category
        ]);
    }
}