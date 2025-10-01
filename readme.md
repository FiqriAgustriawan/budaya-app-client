# 🌟 **BudayaInd - Platform Wisata Budaya Indonesihha**

> **Platform digital modern untuk eksplorasi dan pemesanan wisata budaya Indonesia**  
> Dibangun dengan **Laravel 12 + Inertia.js + React** untuk pengalaman pengguna yang optimal

[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)

---

## 🎯 **Deskripsi Aplikasi**

**BudayaInd** adalah platform digital yang memfasilitasi eksplorasi dan pemesanan wisata budaya Indonesia. Aplikasi ini menggabungkan fitur peta interaktif situs budaya dan sistem booking tiket wisata dengan fokus pada pelestarian warisan budaya Nusantara.

### **✨ Fitur Utama:**
- 🗺️ **Peta Interaktif** - Jelajahi situs budaya Indonesia
- 🎫 **Sistem Booking** - Pesan tiket wisata budaya
- 👥 **Multi-Role System** - Admin, Customer, Seller
- 📱 **Responsive Design** - Optimal di semua perangkat
- ⚡ **SPA Experience** - Navigasi cepat tanpa reload
- 💳 **Payment Integration** - Sistem pembayaran terintegrasi
- 📊 **Analytics Dashboard** - Laporan dan statistik lengkap

---

## 🛠️ **Spesifikasi Sistem**

### **🔧 Minimum Requirements:**
- **PHP 8.3** atau lebih tinggi
- **Composer 2.6+**
- **Node.js 20+** dan **NPM 10+**
- **MySQL 8.0** atau **MariaDB 10.6+**
- **Memory**: 512MB RAM minimum
- **Storage**: 1GB ruang kosong

### **⚡ Recommended:**
- **PHP 8.3+** dengan OPcache enabled
- **MySQL 8.0+** dengan InnoDB
- **Node.js 20 LTS**
- **Memory**: 2GB+ RAM
- **SSD Storage** untuk performa optimal

### **📦 Ekstensi PHP Required:**
```
BCMath, Ctype, cURL, DOM, Fileinfo, JSON, Mbstring, OpenSSL, 
PDO, PDO_MySQL, Tokenizer, XML, Zip, GD/Imagick
```

---

## 🚀 **Quick Start Guide**

### **📋 Step 1: Persiapan Environment**

```bash
# Pastikan PHP 8.3+ terinstall
php --version

# Pastikan Composer terinstall
composer --version

# Pastikan Node.js 20+ terinstall  
node --version
npm --version
```

### **🗄️ Step 2: Setup Database**

```sql
-- Buat database MySQL
CREATE DATABASE budayaind CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- (Opsional) Buat user khusus
CREATE USER 'budayaind_user'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON budayaind.* TO 'budayaind_user'@'localhost';
FLUSH PRIVILEGES;
```

### **⚙️ Step 3: Konfigurasi Environment**

```bash
# Copy file environment
cp .env.example .env
```

**Edit file `.env`:**
```env
APP_NAME=BudayaInd
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=budayaind
DB_USERNAME=root
DB_PASSWORD=

# Tambahkan konfigurasi lainnya sesuai kebutuhan
```

### **📦 Step 4: Install Dependencies**

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies  
npm install

# Generate application key
php artisan key:generate
```

### **🏗️ Step 5: Setup Database & Data**

```bash
# Jalankan migrasi database
php artisan migrate

# Seed database dengan data dummy
php artisan db:seed

# Buat storage link
php artisan storage:link
```

### **🎨 Step 6: Build Assets**

```bash
# Build assets untuk development
npm run dev

# Untuk production
npm run build
```

### **🌐 Step 7: Jalankan Aplikasi**

```bash
# Start Laravel server
php artisan serve

# (Terminal baru) Start Vite dev server untuk hot reload
npm run dev
```

**🎉 Aplikasi akan berjalan di:** `http://localhost:8000`

---

## 👤 **Akun Default untuk Testing**

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **🔧 Admin** | admin@budayaind.com | password | `/admin/dashboard` |
| **👤 Customer** | customer@budayaind.com | password | `/dashboard` |
| **🏪 Seller** | seller@budayaind.com | password | `/seller/dashboard` |

---

## 📊 **Data yang Tersedia**

### **🏛️ Situs Budaya (7 lokasi):**
- **Candi Borobudur** - Jawa Tengah
- **Taman Sari Yogyakarta** - DIY
- **Rumah Gadang** - Sumatera Barat
- **Pura Tanah Lot** - Bali
- **Benteng Fort de Kock** - Sumatera Barat
- **Tongkonan Toraja** - Sulawesi Selatan
- **Masjid Agung Demak** - Jawa Tengah

### **🎫 Paket Wisata (10 paket):**
- **Sunrise Borobudur** (Premium) - Rp 450.000
- **Keraton Yogyakarta** (Basic) - Rp 175.000
- **Workshop Batik** (Premium) - Rp 350.000
- **Sunset Tanah Lot** (Basic) - Rp 275.000
- **Trekking Rumah Gadang** (Premium) - Rp 650.000
- **Photography Tour Candi** (Premium) - Rp 575.000
- **Upacara Adat Toraja** (VIP) - Rp 1.250.000
- **Night Tour Demak** (Basic) - Rp 125.000
- **Benteng Fort de Kock** (Basic) - Rp 195.000
- **Paket 7 Hari Nusantara** (VIP) - Rp 3.500.000

### **📋 Data Pemesanan:**
- ✅ 15 contoh order dengan berbagai status
- ✅ Multiple payment methods
- ✅ Realistic booking scenarios

---

## 🏗️ **Tech Stack**

### **🔙 Backend:**
- **Laravel 12** - PHP Framework terbaru
- **MySQL 8.0** - Database relational
- **Inertia.js** - Backend/Frontend bridge

### **🎨 Frontend:**
- **React 18** - UI Library
- **Inertia.js** - SPA Experience
- **Tailwind CSS** - Utility-first styling
- **Vite** - Modern build tool

### **⚙️ Development:**
- **PHP 8.3+** - Server Language
- **Composer** - PHP Dependencies
- **Node.js 20** - JavaScript Runtime
- **NPM** - Package Manager

---

## 🔧 **Troubleshooting**

### **❌ Error Umum & Solusi:**

#### **1. PHP Version Error**
```bash
# Cek versi PHP
php --version

# Jika kurang dari 8.3, update PHP terlebih dahulu
```

#### **2. Composer Install Error**
```bash
# Clear cache dan install ulang
composer clear-cache
composer install --no-cache
```

#### **3. NPM Install Error**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

#### **4. Database Connection Error**
- ✅ Pastikan MySQL service berjalan
- ✅ Cek kredensial database di `.env`
- ✅ Pastikan database `budayaind` sudah dibuat

#### **5. Permission Error (Linux/Mac)**
```bash
# Set permission yang benar
chmod -R 775 storage bootstrap/cache
```

#### **6. Assets Not Loading**
```bash
# Pastikan Vite running untuk development
npm run dev

# Atau build untuk production
npm run build
```

---

## 📱 **Browser Support**

- ✅ **Chrome 90+**
- ✅ **Firefox 88+**
- ✅ **Safari 14+**
- ✅ **Edge 90+**
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

---

## 🎯 **Development Commands**

### **🔄 Hot Reload Development:**
```bash
# Terminal 1: Laravel Server
php artisan serve

# Terminal 2: Vite HMR
npm run dev
```

### **🚀 Production Build:**
```bash
# Build optimized assets
npm run build

# Optimize Laravel
php artisan optimize
php artisan config:cache
php artisan route:cache
```

### **🧹 Clear Cache:**
```bash
# Clear all cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### **🔄 Reset Database:**
```bash
# Fresh migration dengan seeding
php artisan migrate:fresh --seed
```

---

---

## ✅ **Verifikasi Setup Berhasil**

Setelah menjalankan semua step, pastikan:

- ✅ **Halaman utama** loading dengan peta situs budaya
- ✅ **Login berfungsi** untuk semua role (Admin/Customer/Seller)
- ✅ **Data tickets** dan cultural sites tampil
- ✅ **Booking system** dapat diakses
- ✅ **Admin dashboard** berfungsi normal
- ✅ **Hot reload aktif** saat development
- ✅ **Database terisi** dengan data dummy
- ✅ **Assets compiled** dengan benar

---

## 🔒 **Security Features**

- 🛡️ **CSRF Protection** - Laravel built-in security
- 🔐 **Authentication** - Multi-role user management
- 🚫 **SQL Injection Prevention** - Eloquent ORM protection
- 🔒 **Password Hashing** - Bcrypt encryption
- 🛡️ **XSS Protection** - Input sanitization
- 📝 **Request Validation** - Form validation rules

---

## 🚀 **Performance Optimizations**

- ⚡ **Vite HMR** - Hot module replacement
- 📦 **Code Splitting** - Optimized bundle sizes
- 🗄️ **Database Indexing** - Optimized queries
- 💾 **Caching** - Config, route, view caching
- 🔧 **Laravel Octane** ready
- 📊 **Query Optimization** - N+1 problem prevention

---

## 📞 **Support & Contact**

Jika mengalami kendala, pastikan:
1. ✅ Semua requirements terpenuhi
2. ✅ Database connection berhasil
3. ✅ All dependencies terinstall
4. ✅ Storage permissions benar
5. ✅ Vite server berjalan untuk development

### **🐛 Issue Reporting:**
- Buat issue dengan detail error message
- Sertakan versi PHP, Node.js, dan OS
- Screenshot jika memungkinkan

---

## 📄 **License**

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

---

## 🏆 **Ready for Demo!**

Aplikasi **BudayaInd** siap untuk:
- ✅ **Demo presentasi** dengan data lengkap
- ✅ **Testing** semua fitur utama  
- ✅ **Development** lanjutan
- ✅ **Production deployment**

---

## 📈 **Project Stats**

- 🗄️ **7 Cultural Sites** dengan data lengkap
- 🎫 **10 Tourism Packages** dengan kategori Basic/Premium/VIP
- 👥 **Multi-role System** (Admin/Customer/Seller)
- 📱 **Fully Responsive** design
- ⚡ **SPA Performance** dengan Inertia.js
- 🌐 **Modern Stack** Laravel 12 + React 18

---

**🌟 URL Aplikasi:** `http://localhost:8000`  
**⚙️ Tech Stack:** Laravel 12 + Inertia.js + React + Vite  
**✅ Status:** Ready for Production 🚀

---

<div align="center">

**Made with ❤️ for Indonesian Cultural Heritage**

[![Laravel](https://img.shields.io/badge/Powered%20by-Laravel-red)](https://laravel.com)
[![React](https://img.shields.io/badge/UI%20with-React-blue)](https://reactjs.org)
[![Indonesia](https://img.shields.io/badge/Made%20in-Indonesia-red)](https://indonesia.go.id)

</div>
