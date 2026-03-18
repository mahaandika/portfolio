<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/projects/index', [
            // Tambahkan 'images' di dalam with()
            'projects' => Project::with(['category', 'images'])->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create', [
            'categories' => Category::all()
        ]);
    }

    // app/Http/Controllers/ProjectController.php

    // app/Http/Controllers/ProjectController.php

public function store(Request $request)
{
    $validated = $request->validate([
        'category_id' => 'required|exists:categories,id',
        'title'       => 'required|string|max:255',
        'description' => 'required|string',
        'tech_stack'  => 'required|array',
        'thumbnail'   => 'required|image|mimes:jpg,jpeg,png',
        'url_link'    => 'nullable|url',
        'github_link' => 'nullable|url',
        // Kita tidak memvalidasi 'images' di sini dulu untuk debugging
    ]);

    try {
        return DB::transaction(function () use ($request, $validated) {
            // 1. Simpan Thumbnail
            $thumbnailPath = $request->file('thumbnail')->store('projects/thumbnails', 'public');

            // 2. Buat Project Utama
            $project = Project::create([
                'category_id' => $validated['category_id'],
                'title'       => $validated['title'],
                'slug'        => Str::slug($validated['title']) . '-' . Str::random(5),
                'description' => $validated['description'],
                'thumbnail'   => $thumbnailPath,
                'url_link'    => $validated['url_link'],
                'github_link' => $validated['github_link'],
                'tech_stack'  => $validated['tech_stack'],
            ]);

            // 3. Simpan Gallery (Cek manual dari allFiles)
            $allFiles = $request->allFiles();
            if (isset($allFiles['images'])) {
                foreach ($allFiles['images'] as $index => $imageFile) {
                    $path = $imageFile->store('projects/gallery', 'public');
                    
                    // Simpan ke tabel project_images
                    $project->images()->create([
                        'image_path' => $path,
                        'order'      => $index,
                    ]);
                }
            }

            return redirect('/admin/projects')->with('success', 'Project created!');
        });
    } catch (\Exception $e) {
        // Jika ada error database atau file, ini akan memberitahu kita detailnya
        dd("Penyebab Gagal: " . $e->getMessage()); 
    }
}
}
