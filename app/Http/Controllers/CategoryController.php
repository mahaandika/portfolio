<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

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
    public function create(): \Inertia\Response
    {
        // Merender file Pages/Admin/Categories/Create.tsx
        return Inertia::render('admin/categories/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'   => 'required|string|max:255|unique:categories,name',
            'status' => 'required|in:active,inactive', // Pastikan status divalidasi
        ]);

        Category::create([
            'name'   => $validated['name'],
            'status' => $validated['status'], // Baris ini HARUS ADA
            'slug'   => \Illuminate\Support\Str::slug($validated['name']),
        ]);

        return redirect('/admin/categories');
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