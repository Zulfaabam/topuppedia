# 📱 TopUpPedia - Top Up Paket Internet Cepat dan Mudah

TopUpPedia adalah aplikasi web pengisian pulsa dan paket data modern yang dirancang dengan antarmuka pengguna premium, deteksi provider otomatis, dan alur transaksi yang cepat, mudah, aman serta interaktif.

---

## 🌟 Fitur Utama

- 🔍 **Deteksi Provider Otomatis**: Cukup masukkan nomor telepon, dan sistem akan langsung mengenali provider (Telkomsel, Indosat, XL, Tri, Axis, Smartfren) berdasarkan 4 digit pertama.
- 🛡️ **Validasi Cerdas & Error Modal**: Memastikan nomor telepon memiliki panjang yang tepat (10-13 digit) dan provider terdaftar. Dilengkapi dengan komponen _Error Modal_ custom berbasis animasi yang modern jika terjadi kesalahan pengisian.
- 🔐 **Autentikasi Pengguna**: Sistem Pendaftaran (Signup) dan Masuk (Login) yang aman terintegrasi dengan backend mockup.
- 💳 **Simulasi Pembayaran Instan**: Alur pembelian paket yang mulus, lengkap dengan ringkasan pesanan, biaya layanan, verifikasi keamanan instan (menggunakan kode `TOPUP123`), dan status sukses.
- 📊 **Dasbor Riwayat Transaksi**: Halaman Akun Saya (`/account`) menampilkan informasi detail pengguna, formulir edit profil instan, serta tabel dinamis pelacak status transaksi secara real-time.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan teknologi modern terbaik:

- **Frontend**:
  - **React 18** (Vite build tool)
  - **TypeScript** untuk type-safety
  - **Tailwind CSS** (v4.0) untuk styling utility-first yang super cepat
  - **React Router DOM** untuk routing client-side yang mulus
  - **TanStack Query** (React Query) untuk manajemen state server & caching yang optimal
  - **Framer Motion (`motion/react`)** untuk micro-animations dan transisi modal yang premium
  - **Lucide React** untuk ikon grafis modern
- **Backend / Database Mockup**:
  - **json-server** untuk simulasi REST API yang handal (berjalan di port `3001`)

---

## 🚀 Memulai Penggunaan (Getting Started)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi secara lokal di komputermu:

### 1. Kloning Repositori & Install Dependensi

Pastikan kamu telah menginstal [Node.js](https://nodejs.org/) dan pengelola paket [pnpm](https://pnpm.io/) (atau npm/yarn).

```bash
# Install dependensi menggunakan pnpm
pnpm install
```

### 2. Jalankan Server Mockup (Database)

Aplikasi menggunakan database mockup berbasis `db.json` yang perlu dijalankan terlebih dahulu:

```bash
# Menjalankan json-server pada port 3001
pnpm run server
```

_Server database mockup sekarang berjalan di http://localhost:3001._

### 3. Jalankan Aplikasi (Development Server)

Jalankan server pengembangan Vite untuk antarmuka frontend:

```bash
# Menjalankan Vite dev server
pnpm dev
```

_Aplikasi frontend sekarang dapat diakses secara lokal di browser melalui tautan yang muncul di terminal (biasanya http://localhost:3000)._

---

## 🔑 Informasi Akun & Kode Pengujian

- **Kode Verifikasi Pembayaran (OTP Mock)**: `TOPUP123`
- **Data Mockup Default**: Database pengguna (`users`), daftar paket (`packages`), dan transaksi (`transactions`) tersimpan di file `db.json` di root proyek. Kamu bisa membuat akun baru secara langsung melalui tombol **Daftar** di aplikasi.

---

## 📁 Struktur Folder Proyek

```text
topuppedia/
├── db.json                     # Database mockup untuk json-server
├── src/
│   ├── components/             # Komponen UI Reusable
│   │   ├── Navbar.tsx          # Navigasi atas dengan pendeteksi login
│   │   ├── Hero.tsx            # Bagian utama deteksi provider & pemilihan paket
│   │   ├── PackageCard.tsx     # Tampilan item paket data
│   │   ├── LoginModal.tsx      # Modal login
│   │   ├── SignupModal.tsx     # Modal registrasi pengguna baru
│   │   ├── PaymentModal.tsx    # Modal alur transaksi & OTP mockup
│   │   └── ErrorModal.tsx      # Modal custom alert error validasi nomor
│   ├── contexts/               # React Contexts
│   │   └── UserContext.tsx     # Manajemen state User (Session & Auth)
│   ├── data/                   # Data statis pengenalan prefix & warna
│   ├── pages/                  # Halaman aplikasi utama
│   │   └── MyAccount.tsx       # Detail akun & riwayat transaksi pengguna
│   ├── index.css               # Kustomisasi CSS Tailwind Global
│   ├── main.tsx                # Entry point React
│   └── App.tsx                 # Routing & konfigurasi utama aplikasi
└── README.md                   # Panduan dokumentasi proyek
```

---

## 📜 Author

Dibuat oleh [Abam](https://abams-folio.netlify.app/)
