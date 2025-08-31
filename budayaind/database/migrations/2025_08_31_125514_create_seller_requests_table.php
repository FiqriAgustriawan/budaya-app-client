<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seller_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Informasi Tempat Wisata
            $table->string('nama_tempat_wisata');
            $table->string('email_tempat')->unique();
            $table->string('password_tempat'); // akan di-hash
            $table->text('deskripsi_tempat');
            $table->string('asal_daerah');

            // Kontak & Lokasi
            $table->string('nomor_telepon');
            $table->text('alamat_tempat');

            // Dokumen & Foto
            $table->string('foto_ktp'); // path ke file KTP
            $table->json('foto_tempat'); // array path ke foto-foto tempat

            // Status Request
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('admin_notes')->nullable(); // catatan admin saat review
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_requests');
    }
};
