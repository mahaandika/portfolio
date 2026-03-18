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
    public function edit($id)
    {
        // Cari kategori berdasarkan ID
        $category = Category::findOrFail($id);

        return Inertia::render('admin/categories/edit', [
            'category' => $category
        ]);
    }

/**
 * Memproses pembaruan data kategori.
 */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        // Validasi input
        // Pastikan unique name mengabaikan ID kategori yang sedang diedit
        $validated = $request->validate([
            'name'   => 'required|string|max:255|unique:categories,name,' . $id,
            'status' => 'required|in:active,inactive',
        ]);

        // Update data
        $category->update([
            'name'   => $validated['name'],
            'status' => $validated['status'],
            'slug'   => Str::slug($validated['name']),
        ]);

        // Redirect ke index dengan pesan sukses (opsional)
        return redirect('/admin/categories')->with('success', 'Category updated successfully');
    }

    public function destroy($id)
    {
        // Cari kategori berdasarkan ID
        $category = Category::findOrFail($id);

        // Hapus kategori
        $category->delete();

        // Redirect kembali ke halaman index
        return redirect('/admin/categories')->with('success', 'Category deleted successfully');
    }
}