<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Experience;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('home', [
            'categories'  => Category::all(),
            'experiences' => Experience::orderBy('start_date', 'desc')->get(),
            'projects'    => Project::with(['category', 'images'])->latest()->get(),
        ]);
    }
}
