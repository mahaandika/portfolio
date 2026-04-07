<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Project;
use App\Models\ProjectImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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

    public function edit(Project $project)
    {
        // Load relasi agar gallery muncul di form edit
        return Inertia::render('admin/projects/edit', [
            'project' => $project->load('images'),
            'categories' => Category::all()
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'tech_stack'  => 'required|array',
            'thumbnail'   => 'nullable|image|mimes:jpg,jpeg,png', // Nullable karena mungkin tidak diganti
            'url_link'    => 'nullable|url',
            'github_link' => 'nullable|url',
            'new_images'  => 'nullable|array', // Untuk foto gallery tambahan
            'new_images.*'=> 'image|mimes:jpg,jpeg,png',
        ]);

        return DB::transaction(function () use ($request, $project, $validated) {
            // 1. Update Thumbnail jika ada file baru
            if ($request->hasFile('thumbnail')) {
                // Hapus foto lama dari storage
                if ($project->thumbnail) {
                    Storage::disk('public')->delete($project->thumbnail);
                }
                $validated['thumbnail'] = $request->file('thumbnail')->store('projects/thumbnails', 'public');
            } else {
                // Jika tidak upload baru, gunakan yang lama
                unset($validated['thumbnail']);
            }

            // 2. Update Data Project
            $project->update([
                ...collect($validated)->except(['new_images'])->toArray(),
                'slug' => Str::slug($request->title) . '-' . $project->id,
            ]);

            // 3. Tambah Gallery Baru (jika ada)
            if ($request->hasFile('new_images')) {
                $lastOrder = $project->images()->max('order') ?? 0;
                foreach ($request->file('new_images') as $index => $imageFile) {
                    $path = $imageFile->store('projects/gallery', 'public');
                    $project->images()->create([
                        'image_path' => $path,
                        'order'      => $lastOrder + $index + 1,
                    ]);
                }
            }

            return redirect('admin/projects')->with('success', 'Project updated successfully!');
        });
    }

    // Fungsi tambahan untuk menghapus foto gallery satu per satu via AJAX/Inertia
    // app/Http/Controllers/ProjectController.php

    public function deleteImage(\App\Models\ProjectImage $projectImage)
    {
        try {
            // 1. Hapus file fisik dari folder storage/public/projects/gallery
            if (Storage::disk('public')->exists($projectImage->image_path)) {
                Storage::disk('public')->delete($projectImage->image_path);
            }

            // 2. Hapus data dari database
            $projectImage->delete();

            // 3. Kembali ke halaman sebelumnya dengan pesan sukses
            return back()->with('success', 'Image deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete image');
        }
    }

    public function destroy(Project $project)
    {
        try {
            return DB::transaction(function () use ($project) {
                // 1. Hapus Semua Foto di Gallery (File Fisik)
                foreach ($project->images as $image) {
                    if (Storage::disk('public')->exists($image->image_path)) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                }

                // 2. Hapus Thumbnail Utama (File Fisik)
                if ($project->thumbnail && Storage::disk('public')->exists($project->thumbnail)) {
                    Storage::disk('public')->delete($project->thumbnail);
                }

                // 3. Hapus Data dari Database
                // Karena migration kita pakai onDelete('cascade'), 
                // data di tabel project_images akan otomatis ikut terhapus saat $project->delete() dipanggil.
                $project->delete();

                return redirect()->route('admin.projects.index')
                    ->with('success', 'Project dan seluruh medianya berhasil dihapus secara permanen.');
            });
        } catch (\Exception $e) {
            return back()->with('error', 'Gagal menghapus project: ' . $e->getMessage());
        }
    }

    public function projectsClient(){
        return Inertia::render('projects', [
            'categories'  => Category::all(),
            'projects'    => Project::with(['category', 'images'])->latest()->get(),
        ]);
    }

    public function show(Project $project)
    {
        // Muat relasi category (dan images jika ada)
        $project->load('category', 'images');

        return Inertia::render('projectDetails', [
        'project' => [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'thumbnail' => $project->thumbnail,
            'category' => $project->category,
            // Mengambil tahun saja dari created_at
            'year' => $project->created_at->format('Y'), 
            'images' => $project->images,
        ]
    ]);
    }
}
