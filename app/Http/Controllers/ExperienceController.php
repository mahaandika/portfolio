<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/experiences/index', [
            'experiences' => Experience::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/experiences/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company'     => 'required|string|max:255',
            'position'    => 'required|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|required_if:is_current,false|date|after_or_equal:start_date',
            'is_current'  => 'required|boolean',
            'description' => 'nullable|string',
        ]);

        Experience::create($validated);

        return redirect('/admin/experiences')->with('success', 'Experience added successfully!');
    }

    public function edit($id)
    {
        $experience = Experience::findOrFail($id);

        // Format tanggal agar sesuai dengan input type="date" (YYYY-MM-DD)
        $experience->start_date = $experience->start_date ? $experience->start_date->format('Y-m-d') : null;
        $experience->end_date = $experience->end_date ? $experience->end_date->format('Y-m-d') : null;

        return Inertia::render('admin/experiences/edit', [
            'experience' => $experience
        ]);
    }

    public function update(Request $request, $id)
    {
        $experience = Experience::findOrFail($id);

        $validated = $request->validate([
            'company'     => 'required|string|max:255',
            'position'    => 'required|string|max:255',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|required_if:is_current,false|date|after_or_equal:start_date',
            'is_current'  => 'required|boolean',
            'description' => 'nullable|string',
        ]);

        // Jika is_current true, pastikan end_date di set null di database
        if ($validated['is_current']) {
            $validated['end_date'] = null;
        }

        $experience->update($validated);

        return redirect('/admin/experiences')->with('success', 'Experience updated successfully!');
    }
}
