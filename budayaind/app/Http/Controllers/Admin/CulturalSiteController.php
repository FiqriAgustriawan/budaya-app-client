<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CulturalSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class CulturalSiteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $province = $request->get('province');
        $category = $request->get('category');
        $status = $request->get('status');

        $culturalSites = CulturalSite::query()
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                           ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($province && $province !== 'all', function ($query, $province) {
                return $query->where('province', $province);
            })
            ->when($category && $category !== 'all', function ($query, $category) {
                return $query->where('category', $category);
            })
            ->when($status !== null && $status !== 'all', function ($query) use ($status) {
                return $query->where('is_active', $status === '1');
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        // Convert coordinates to float for each item
        $culturalSites->getCollection()->transform(function ($site) {
            $site->latitude = (float) $site->latitude;
            $site->longitude = (float) $site->longitude;
            return $site;
        });

        // Get provinces and categories for filters
        $provinces = CulturalSite::distinct()
            ->pluck('province')
            ->filter()
            ->sort()
            ->values()
            ->toArray();

        $categories = CulturalSite::distinct()
            ->pluck('category')
            ->filter()
            ->sort()
            ->values()
            ->toArray();

        return Inertia::render('Admin/CulturalSites/Index', [
            'culturalSites' => $culturalSites,
            'provinces' => $provinces,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'province' => $province ?? 'all',
                'category' => $category ?? 'all',
                'status' => $status ?? 'all',
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $existingProvinces = CulturalSite::distinct()
            ->pluck('province')
            ->filter()
            ->sort()
            ->values();

        $existingCategories = CulturalSite::distinct()
            ->pluck('category')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('Admin/CulturalSites/Create', [
            'existingProvinces' => $existingProvinces,
            'existingCategories' => $existingCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'description' => 'required|string|max:1000',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'youtube_video' => 'nullable|url',
            'articles_count' => 'nullable|integer|min:0',
            'photos_count' => 'nullable|integer|min:0',
            'videos_count' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Convert coordinates to float
        $validated['latitude'] = (float) $validated['latitude'];
        $validated['longitude'] = (float) $validated['longitude'];

        // Generate unique slug
        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $counter = 1;
        
        while (CulturalSite::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $validated['slug'] = $slug;

        // Handle main image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('cultural-sites', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        // Handle multiple photos upload
        $photosPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $photoPath = $photo->store('cultural-sites/photos', 'public');
                $photosPaths[] = '/storage/' . $photoPath;
            }
        }
        $validated['photos'] = $photosPaths;

        // Set default counts
        $validated['articles_count'] = $validated['articles_count'] ?? 0;
        $validated['photos_count'] = $validated['photos_count'] ?? count($photosPaths);
        $validated['videos_count'] = $validated['videos_count'] ?? ($validated['youtube_video'] ? 1 : 0);

        CulturalSite::create($validated);

        return redirect()
            ->route('admin.cultural-sites.index')
            ->with('success', 'Cultural site created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(CulturalSite $culturalSite)
    {
        // Ensure coordinates are float
        $culturalSite->latitude = (float) $culturalSite->latitude;
        $culturalSite->longitude = (float) $culturalSite->longitude;

        return Inertia::render('Admin/CulturalSites/Show', [
            'culturalSite' => $culturalSite,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CulturalSite $culturalSite)
    {
        // Ensure coordinates are float
        $culturalSite->latitude = (float) $culturalSite->latitude;
        $culturalSite->longitude = (float) $culturalSite->longitude;

        $existingProvinces = CulturalSite::distinct()
            ->pluck('province')
            ->filter()
            ->sort()
            ->values();

        $existingCategories = CulturalSite::distinct()
            ->pluck('category')
            ->filter()
            ->sort()
            ->values();

        return Inertia::render('Admin/CulturalSites/Edit', [
            'culturalSite' => $culturalSite,
            'existingProvinces' => $existingProvinces,
            'existingCategories' => $existingCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CulturalSite $culturalSite)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'province' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'description' => 'required|string|max:1000',
            'content' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'photos.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'youtube_video' => 'nullable|url',
            'articles_count' => 'nullable|integer|min:0',
            'photos_count' => 'nullable|integer|min:0',
            'videos_count' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        // Convert coordinates to float
        $validated['latitude'] = (float) $validated['latitude'];
        $validated['longitude'] = (float) $validated['longitude'];

        // Update slug if name changed
        if ($validated['name'] !== $culturalSite->name) {
            $baseSlug = Str::slug($validated['name']);
            $slug = $baseSlug;
            $counter = 1;
            
            while (CulturalSite::where('slug', $slug)->where('id', '!=', $culturalSite->id)->exists()) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }
            $validated['slug'] = $slug;
        }

        // Handle main image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($culturalSite->image && str_starts_with($culturalSite->image, '/storage/')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $culturalSite->image));
            }

            $imagePath = $request->file('image')->store('cultural-sites', 'public');
            $validated['image'] = '/storage/' . $imagePath;
        }

        // Handle photos
        $currentPhotos = $culturalSite->photos ?? [];
        
        // Add new photos
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $photoPath = $photo->store('cultural-sites/photos', 'public');
                $currentPhotos[] = '/storage/' . $photoPath;
            }
        }

        $validated['photos'] = array_values($currentPhotos);

        // Update counts
        $validated['articles_count'] = $validated['articles_count'] ?? $culturalSite->articles_count;
        $validated['photos_count'] = $validated['photos_count'] ?? count($validated['photos']);
        $validated['videos_count'] = $validated['videos_count'] ?? ($validated['youtube_video'] ? 1 : 0);

        $culturalSite->update($validated);

        return redirect()
            ->route('admin.cultural-sites.show', $culturalSite)
            ->with('success', 'Cultural site updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CulturalSite $culturalSite)
    {
        // Delete associated files
        if ($culturalSite->image && str_starts_with($culturalSite->image, '/storage/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $culturalSite->image));
        }

        if ($culturalSite->photos) {
            foreach ($culturalSite->photos as $photo) {
                if (str_starts_with($photo, '/storage/')) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $photo));
                }
            }
        }

        $culturalSite->delete();

        return redirect()
            ->route('admin.cultural-sites.index')
            ->with('success', 'Cultural site deleted successfully!');
    }

    /**
     * Toggle the active status of a cultural site
     */
    public function toggleStatus(CulturalSite $culturalSite)
    {
        $culturalSite->update([
            'is_active' => !$culturalSite->is_active
        ]);

        $status = $culturalSite->is_active ? 'activated' : 'deactivated';

        return back()->with('success', "Cultural site has been {$status} successfully!");
    }
}