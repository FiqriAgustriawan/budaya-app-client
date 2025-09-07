<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CulturalSite extends Model
{
  use HasFactory;

  protected $fillable = [
    'name',
    'slug',
    'province',
    'category',
    'latitude',
    'longitude',
    'description',
    'content',
    'image',
    'photos',
    'youtube_video',
    'articles_count',
    'photos_count',
    'videos_count',
    'is_active',
  ];

  protected $casts = [
    'latitude' => 'float',
    'longitude' => 'float',
    'photos' => 'array',
    'is_active' => 'boolean',
    'articles_count' => 'integer',
    'photos_count' => 'integer',
    'videos_count' => 'integer',
  ];

  /**
   * Get the route key for the model.
   */
  public function getRouteKeyName()
  {
    return 'id';
  }

  /**
   * Boot the model.
   */
  protected static function boot()
  {
    parent::boot();

    static::creating(function ($model) {
      if (empty($model->slug)) {
        $model->slug = Str::slug($model->name);
      }
    });
  }

  /**
   * Accessor untuk latitude yang selalu return float
   */
  public function getLatitudeAttribute($value)
  {
    return $value !== null ? (float) $value : null;
  }

  /**
   * Accessor untuk longitude yang selalu return float
   */
  public function getLongitudeAttribute($value)
  {
    return $value !== null ? (float) $value : null;
  }
}
