import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
  FiCheck, FiX, FiAlertCircle, FiInfo, FiUsers, FiCamera,
  FiFileText, FiShield, FiStar, FiTrendingUp, FiDollarSign,
  FiClock, FiMapPin, FiPhone, FiMail, FiArrowRight, FiChevronDown,
  FiChevronUp, FiHelpCircle
} from 'react-icons/fi';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Props {
  user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Request Seller',
    href: '/customer/request-seller-requirements',
  },
];

export default function SellerRequirements({ user }: Props) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const requirements = [
    {
      title: "Memiliki Tempat Wisata Budaya yang Legal",
      description: "Tempat wisata harus memiliki izin operasional yang sah dan sesuai dengan peraturan daerah",
      icon: FiShield,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Berkomitmen pada Pelestarian Budaya",
      description: "Menjaga dan melestarikan nilai-nilai budaya lokal serta tradisi yang ada",
      icon: FiStar,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Pelayanan Berkualitas",
      description: "Memberikan pelayanan terbaik kepada wisatawan dengan standar kualitas tinggi",
      icon: FiUsers,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Dokumentasi Lengkap",
      description: "Menyediakan foto dan dokumentasi yang memadai tentang tempat wisata",
      icon: FiCamera,
      color: "text-orange-600 dark:text-orange-400"
    }
  ];

  const benefits = [
    {
      title: "Jangkauan Pasar Luas",
      description: "Akses ke ribuan wisatawan domestik dan internasional",
      icon: FiTrendingUp
    },
    {
      title: "Sistem Pembayaran Aman",
      description: "Sistem pembayaran terintegrasi dan aman untuk transaksi",
      icon: FiDollarSign
    },
    {
      title: "Marketing Support",
      description: "Dukungan pemasaran digital untuk meningkatkan visibilitas",
      icon: FiStar
    },
    {
      title: "Dashboard Analytics",
      description: "Analitik mendalam untuk mengoptimalkan bisnis Anda",
      icon: FiFileText
    }
  ];

  const faqs = [
    {
      question: "Apakah ada biaya untuk menjadi seller?",
      answer: "Tidak ada biaya pendaftaran untuk menjadi seller. Kami hanya mengambil komisi dari setiap transaksi yang berhasil."
    },
    {
      question: "Berapa lama proses verifikasi?",
      answer: "Proses verifikasi biasanya memakan waktu 3-7 hari kerja setelah dokumen lengkap diterima."
    },
    {
      question: "Dokumen apa saja yang diperlukan?",
      answer: "Anda perlu menyiapkan KTP, foto tempat wisata (minimal 3), surat izin usaha/operasional, dan deskripsi lengkap tempat wisata."
    },
    {
      question: "Bagaimana sistem komisi yang berlaku?",
      answer: "Kami mengambil komisi 10% dari setiap transaksi berhasil. Pembayaran dilakukan setiap minggu."
    },
    {
      question: "Apakah bisa mengatur harga sendiri?",
      answer: "Ya, sebagai seller Anda memiliki kontrol penuh terhadap penetapan harga tiket dan paket wisata."
    },
    {
      question: "Bagaimana jika ada masalah dengan wisatawan?",
      answer: "Tim customer service kami siap membantu menyelesaikan masalah 24/7. Kami juga memiliki sistem dispute resolution."
    }
  ];

  const handleProceedToForm = () => {
    setProcessing(true);

    // Set session storage sebelum redirect
    sessionStorage.setItem('seller_requirements_accepted', 'true');

    router.get('/customer/request-seller', {}, {
      onFinish: () => setProcessing(false)
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Syarat & Ketentuan Menjadi Seller" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">

        {/* Hero Section */}
        <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-sidebar-border p-8 shadow-sm">
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50">
              <FiUsers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Bergabung Sebagai Seller
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Promosikan tempat wisata budaya Anda kepada ribuan wisatawan.
              Pahami syarat dan ketentuan sebelum memulai perjalanan sebagai seller.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center">
                <FiClock className="w-4 h-4 mr-2" />
                Proses 3-7 hari
              </div>
              <div className="flex items-center">
                <FiShield className="w-4 h-4 mr-2" />
                Gratis bergabung
              </div>
              <div className="flex items-center">
                <FiTrendingUp className="w-4 h-4 mr-2" />
                Komisi 10%
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
          <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
              <FiFileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              Syarat & Ketentuan
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-sidebar-border/50 rounded-lg">
                  <div className={`flex-shrink-0 ${req.color}`}>
                    <req.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                      {req.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">
                      {req.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Terms */}
            <div className="mt-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Ketentuan Umum:
              </h3>
              <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
                <li className="flex items-start">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Seller harus menyediakan informasi yang akurat dan terkini tentang tempat wisata
                </li>
                <li className="flex items-start">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Menjaga kualitas pelayanan dan fasilitas sesuai dengan deskripsi yang diberikan
                </li>
                <li className="flex items-start">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Merespons pertanyaan dan keluhan wisatawan dalam waktu maksimal 24 jam
                </li>
                <li className="flex items-start">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Mematuhi peraturan dan kebijakan platform BudayaInd
                </li>
                <li className="flex items-start">
                  <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Tidak melakukan praktik yang merugikan wisatawan atau platform
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
          <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
              <FiStar className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
              Keuntungan Menjadi Seller
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-4 border border-sidebar-border/50 rounded-lg hover:shadow-md transition-shadow">
                  <benefit.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar shadow-sm">
          <div className="border-b border-sidebar-border/70 dark:border-sidebar-border px-6 py-4">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 flex items-center">
              <FiHelpCircle className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
              Frequently Asked Questions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-sidebar-border/50 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <FiChevronUp className="w-5 h-5 text-neutral-500" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-neutral-500" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-3 border-t border-sidebar-border/30">
                      <p className="text-neutral-600 dark:text-neutral-300 pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="rounded-xl border border-sidebar-border/70 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-sidebar-border p-6 shadow-sm">
          <div className="text-center space-y-4">
            <FiInfo className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Butuh Bantuan Lebih Lanjut?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Tim support kami siap membantu Anda 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:seller-support@budayaind.com"
                className="inline-flex items-center px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <FiMail className="w-4 h-4 mr-2" />
                seller-support@budayaind.com
              </a>
              <a
                href="tel:+62811234567"
                className="inline-flex items-center px-4 py-2 border border-purple-300 dark:border-purple-700 rounded-lg text-sm font-medium text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <FiPhone className="w-4 h-4 mr-2" />
                +62 811-234-567
              </a>
            </div>
          </div>
        </div>

        {/* Agreement & Continue */}
        <div className="rounded-xl border border-sidebar-border/70 bg-white dark:border-sidebar-border dark:bg-sidebar p-6 shadow-sm">
          <div className="space-y-6">

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms-agreement"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms-agreement" className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Saya telah membaca dan memahami semua syarat dan ketentuan yang berlaku.
                Saya berkomitmen untuk menjaga kualitas pelayanan dan mematuhi kebijakan platform BudayaInd.
                Saya juga memahami bahwa informasi yang saya berikan harus akurat dan dapat dipertanggungjawabkan.
              </label>
            </div>

            {/* Warning Notice */}
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">
                  Penting untuk Diperhatikan:
                </p>
                <p className="text-yellow-700 dark:text-yellow-400">
                  Proses verifikasi akan memakan waktu 3-7 hari kerja. Pastikan semua dokumen yang diunggah jelas dan lengkap untuk mempercepat proses verifikasi.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/customer/profile"
                className="inline-flex items-center justify-center px-6 py-3 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                Kembali ke Profile
              </Link>

              <button
                onClick={() => setShowConfirmModal(true)}
                disabled={!acceptedTerms}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FiArrowRight className="w-4 h-4 mr-2" />
                Lanjut ke Form Pendaftaran
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-sidebar rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50">
                  <FiCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  Konfirmasi Persetujuan
                </h3>

                <p className="text-neutral-600 dark:text-neutral-300">
                  Dengan melanjutkan, Anda menyetujui untuk:
                </p>

                <ul className="text-left text-sm text-neutral-600 dark:text-neutral-300 space-y-2">
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Mematuhi semua syarat dan ketentuan
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Menyediakan informasi yang akurat
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Menunggu proses verifikasi 3-7 hari
                  </li>
                </ul>

                <div className="flex gap-3 justify-end mt-6">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 border border-sidebar-border rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleProceedToForm}
                    disabled={processing}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {processing ? 'Loading...' : 'Ya, Lanjutkan'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}