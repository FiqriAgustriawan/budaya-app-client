<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use App\Models\CulturalSite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CulturalSiteController extends Controller
{
  public function publicIndex(Request $request)
  {
    $query = CulturalSite::where('is_active', true);

    // Search
    if ($request->filled('search')) {
      $search = $request->get('search');
      $query->where(function ($q) use ($search) {
        $q->where('name', 'like', "%{$search}%")
          ->orWhere('description', 'like', "%{$search}%")
          ->orWhere('province', 'like', "%{$search}%");
      });
    }

    // Filter by province
    if ($request->filled('province')) {
      $query->where('province', $request->get('province'));
    }

    // Filter by category
    if ($request->filled('category')) {
      $query->where('category', $request->get('category'));
    }

    $culturalSites = $query->select([
      'id',
      'name',
      'slug',
      'province',
      'category',
      'latitude',
      'longitude',
      'description',
      'image',
      'articles_count',
      'photos_count',
      'videos_count',
      'created_at'
    ])
      ->orderBy('name')
      ->paginate(12)
      ->withQueryString();

    // Get filter options
    $provinces = CulturalSite::where('is_active', true)
      ->distinct()
      ->pluck('province')
      ->sort()
      ->values();

    $categories = CulturalSite::where('is_active', true)
      ->distinct()
      ->pluck('category')
      ->sort()
      ->values();

    return Inertia::render('CulturalSites/Index', [
      'culturalSites' => $culturalSites,
      'provinces' => $provinces,
      'categories' => $categories,
      'filters' => $request->only(['search', 'province', 'category']),
    ]);
  }

  public function publicShow(CulturalSite $culturalSite)
  {
    // Add debugging
    Log::info('Cultural Site Found:', [
        'id' => $culturalSite->id,
        'name' => $culturalSite->name,
        'slug' => $culturalSite->slug,
        'is_active' => $culturalSite->is_active,
    ]);

    // Only show active sites to public
    if (!$culturalSite->is_active) {
      abort(404);
    }

    // Get related sites (same province or category)
    $relatedSites = CulturalSite::where('is_active', true)
      ->where('id', '!=', $culturalSite->id)
      ->where(function ($query) use ($culturalSite) {
        $query->where('province', $culturalSite->province)
          ->orWhere('category', $culturalSite->category);
      })
      ->limit(6)
      ->get();

    // Get nearby sites (same province)
    $nearbySites = CulturalSite::where('is_active', true)
      ->where('id', '!=', $culturalSite->id)
      ->where('province', $culturalSite->province)
      ->limit(4)
      ->get();

    return Inertia::render('CulturalSite/Show', [
      'culturalSite' => [
        'id' => $culturalSite->id,
        'name' => $culturalSite->name,
        'slug' => $culturalSite->slug,
        'province' => $culturalSite->province,
        'category' => $culturalSite->category,
        'latitude' => (float) $culturalSite->latitude,
        'longitude' => (float) $culturalSite->longitude,
        'description' => $culturalSite->description,
        'content' => $culturalSite->content,
        'image' => $culturalSite->image,
        'photos' => $culturalSite->photos ? json_decode($culturalSite->photos, true) : [],
        'youtube_video' => $culturalSite->youtube_video,
        'articles_count' => $culturalSite->articles_count,
        'photos_count' => $culturalSite->photos_count,
        'videos_count' => $culturalSite->videos_count,
        'is_active' => $culturalSite->is_active,
        'created_at' => $culturalSite->created_at->format('Y-m-d H:i:s'),
        'updated_at' => $culturalSite->updated_at->format('Y-m-d H:i:s'),
      ],
      'relatedSites' => $relatedSites->map(function ($site) {
        return [
          'id' => $site->id,
          'name' => $site->name,
          'slug' => $site->slug,
          'province' => $site->province,
          'category' => $site->category,
          'description' => $site->description,
          'image' => $site->image,
          'articles_count' => $site->articles_count,
          'photos_count' => $site->photos_count,
        ];
      }),
      'nearbySites' => $nearbySites->map(function ($site) {
        return [
          'id' => $site->id,
          'name' => $site->name,
          'slug' => $site->slug,
          'province' => $site->province,
          'category' => $site->category,
          'latitude' => (float) $site->latitude,
          'longitude' => (float) $site->longitude,
          'description' => $site->description,
          'image' => $site->image,
        ];
      }),
    ]);
  }

  public function show(string $slug)
  {
    $culturalSite = CulturalSite::where('slug', $slug)
      ->where('is_active', true)
      ->firstOrFail();

    // Get related sites (same province or category)
    $relatedSites = CulturalSite::where('is_active', true)
      ->where('id', '!=', $culturalSite->id)
      ->where(function ($query) use ($culturalSite) {
        $query->where('province', $culturalSite->province)
          ->orWhere('category', $culturalSite->category);
      })
      ->limit(6)
      ->get();

    // Get nearby sites (you can implement this based on coordinates)
    $nearbySites = CulturalSite::where('is_active', true)
      ->where('id', '!=', $culturalSite->id)
      ->where('province', $culturalSite->province)
      ->limit(4)
      ->get();

    return Inertia::render('CulturalSites/Detail', [
      'culturalSite' => [
        'id' => $culturalSite->id,
        'name' => $culturalSite->name,
        'slug' => $culturalSite->slug,
        'province' => $culturalSite->province,
        'category' => $culturalSite->category,
        'latitude' => (float) $culturalSite->latitude,
        'longitude' => (float) $culturalSite->longitude,
        'description' => $culturalSite->description,
        'content' => $culturalSite->content,
        'image' => $culturalSite->image,
        'photos' => $culturalSite->photos ? json_decode($culturalSite->photos, true) : [],
        'youtube_video' => $culturalSite->youtube_video,
        'articles_count' => $culturalSite->articles_count,
        'photos_count' => $culturalSite->photos_count,
        'videos_count' => $culturalSite->videos_count,
        'is_active' => $culturalSite->is_active,
        'created_at' => $culturalSite->created_at->format('Y-m-d H:i:s'),
        'updated_at' => $culturalSite->updated_at->format('Y-m-d H:i:s'),
      ],
      'relatedSites' => $relatedSites->map(function ($site) {
        return [
          'id' => $site->id,
          'name' => $site->name,
          'slug' => $site->slug,
          'province' => $site->province,
          'category' => $site->category,
          'description' => $site->description,
          'image' => $site->image,
          'articles_count' => $site->articles_count,
          'photos_count' => $site->photos_count,
        ];
      }),
      'nearbySites' => $nearbySites->map(function ($site) {
        return [
          'id' => $site->id,
          'name' => $site->name,
          'slug' => $site->slug,
          'province' => $site->province,
          'category' => $site->category,
          'latitude' => (float) $site->latitude,
          'longitude' => (float) $site->longitude,
          'description' => $site->description,
          'image' => $site->image,
        ];
      }),
    ]);
  }
}
