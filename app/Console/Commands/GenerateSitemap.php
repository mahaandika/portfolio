<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Project; // Sesuaikan dengan nama Model Project kamu

class GenerateSitemap extends Command
{
    // Ini adalah nama perintah yang akan dipanggil di terminal
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the XML sitemap untuk SEO.';

    public function handle()
    {
        $this->info('Memulai generate sitemap...');

        // 1. Inisialisasi sitemap dasar dengan halaman statis kamu
        $sitemap = Sitemap::create()
            ->add(Url::create('/')->setPriority(1.0)->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY))
            ->add(Url::create('/about')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY))
            ->add(Url::create('/contact')->setPriority(0.8)->setChangeFrequency(Url::CHANGE_FREQUENCY_MONTHLY));

        // 2. Ambil semua data project dari database secara dinamis
        $projects = Project::all(); // atau Project::where('is_published', true)->get();

        foreach ($projects as $project) {
            // Sesuaikan '/projects/' dengan struktur URL halaman detail project publik kamu
            // Dan sesuaikan '$project->slug' dengan kolom slug/id di database kamu
            $sitemap->add(
                Url::create("/projects/{$project->id}")
                    ->setPriority(0.9)
                    ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY)
                    ->setLastModificationDate($project->updated_at)
            );
        }

        // 3. Simpan file XML langsung ke folder public/
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap.xml berhasil dibuat di folder public!');
    }
}