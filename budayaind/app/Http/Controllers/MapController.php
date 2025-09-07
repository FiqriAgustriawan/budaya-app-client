<?php

namespace App\Http\Controllers;

use App\Models\CulturalSite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index(Request $request)
    {
        // Get filter parameters
        $search = $request->get('search');
        $province = $request->get('province');
        $category = $request->get('category');

        // Build query
        $sites = CulturalSite::where('is_active', true)
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($province && $province !== 'Semua Provinsi', function ($query, $province) {
                return $query->where('province', $province);
            })
            ->when($category && $category !== 'Semua Kategori', function ($query, $category) {
                return $query->where('category', $category);
            })
            ->orderBy('name')
            ->get()
            ->map(function ($site) {
                return [
                    'id' => $site->id,
                    'name' => $site->name,
                    'slug' => $site->slug,
                    'province' => $site->province,
                    'category' => $site->category,
                    'latitude' => $site->latitude,
                    'longitude' => $site->longitude,
                    'description' => $site->description,
                    'image' => $site->image,
                    'youtube_video' => $site->youtube_video,
                    'articles_count' => $site->articles_count,
                    'photos_count' => $site->photos_count,
                    'videos_count' => $site->videos_count,
                    'is_active' => $site->is_active,
                    'created_at' => $site->created_at,
                ];
            });

        // Get available provinces and categories
        $provinces = ['Semua Provinsi'];
        $provinces = array_merge($provinces, CulturalSite::where('is_active', true)
            ->distinct()
            ->pluck('province')
            ->sort()
            ->values()
            ->toArray());

        $categories = ['Semua Kategori'];
        $categories = array_merge($categories, CulturalSite::where('is_active', true)
            ->distinct()
            ->pluck('category')
            ->sort()
            ->values()
            ->toArray());

        return Inertia::render('map', [
            'culturalSites' => $sites,
            'provinces' => $provinces,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'province' => $province ?? 'Semua Provinsi',
                'category' => $category ?? 'Semua Kategori',
            ],
        ]);
    }

    public function show($slug)
    {
        $site = CulturalSite::where('is_active', true)
            ->where('slug', $slug)
            ->firstOrFail();

        // Get related sites (same province or category)
        $relatedSites = CulturalSite::where('is_active', true)
            ->where('id', '!=', $site->id)
            ->where(function ($query) use ($site) {
                $query->where('province', $site->province)
                    ->orWhere('category', $site->category);
            })
            ->limit(6)
            ->get()
            ->map(function ($relatedSite) {
                return [
                    'id' => $relatedSite->id,
                    'name' => $relatedSite->name,
                    'slug' => $relatedSite->slug,
                    'province' => $relatedSite->province,
                    'category' => $relatedSite->category,
                    'description' => $relatedSite->description,
                    'image' => $relatedSite->image,
                ];
            });

        return Inertia::render('CulturalSite/Show', [
            'site' => [
                'id' => $site->id,
                'name' => $site->name,
                'slug' => $site->slug,
                'province' => $site->province,
                'category' => $site->category,
                'latitude' => $site->latitude,
                'longitude' => $site->longitude,
                'description' => $site->description,
                'content' => $site->content,
                'image' => $site->image,
                'youtube_video' => $site->youtube_video,
                'articles_count' => $site->articles_count,
                'photos_count' => $site->photos_count,
                'videos_count' => $site->videos_count,
                'created_at' => $site->created_at,
            ],
            'relatedSites' => $relatedSites,
        ]);
    }
}
