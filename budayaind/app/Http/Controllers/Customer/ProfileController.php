<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
  public function index(Request $request)
  {
    $user = $request->user();

    return Inertia::render('Customer/Profile', [
      'user' => [
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'role' => $user->role,
        'phone' => $user->phone,
        'address' => $user->address,
        'profile_image' => $user->profile_image,
        'is_active' => $user->is_active,
        'created_at' => $user->created_at,
      ]
    ]);
  }

  public function update(Request $request)
  {
    $user = $request->user();

    // Validate request
    $validated = $request->validate([
      'phone' => 'nullable|string|max:20',
      'address' => 'nullable|string|max:500',
      'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    // Prepare update data
    $updateData = [];

    // Handle phone
    if ($request->has('phone')) {
      $phone = trim($request->input('phone', ''));
      $updateData['phone'] = $phone === '' ? null : $phone;
    }

    // Handle address
    if ($request->has('address')) {
      $address = trim($request->input('address', ''));
      $updateData['address'] = $address === '' ? null : $address;
    }

    // Handle profile image
    if ($request->hasFile('profile_image')) {
      try {
        // Delete old image
        if ($user->profile_image && Storage::exists('public/' . $user->profile_image)) {
          Storage::delete('public/' . $user->profile_image);
        }

        // Store new image
        $imagePath = $request->file('profile_image')->store('profile-images', 'public');
        $updateData['profile_image'] = $imagePath;
      } catch (\Exception $e) {
        return back()->withErrors(['profile_image' => 'Gagal mengupload gambar: ' . $e->getMessage()]);
      }
    }

    // Update if we have data
    if (!empty($updateData)) {
      try {
        $user->update($updateData);
        return redirect()->route('customer.profile.index')->with('success', 'Profile berhasil diperbarui!');
      } catch (\Exception $e) {
        return back()->withErrors(['general' => 'Gagal memperbarui profile: ' . $e->getMessage()]);
      }
    }

    return redirect()->route('customer.profile.index')->with('success', 'Profile berhasil diperbarui!');
  }
}
