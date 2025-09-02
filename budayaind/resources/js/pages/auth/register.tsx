import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function RegisterContent() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { theme } = useTheme();

    return (
        <>
            <Head title="Daftar - BudayaInd">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=space-grotesk:300,400,500,600,700&family=inter:300,400,500,600" rel="stylesheet" />
            </Head>

            {/* Dynamic Background */}
            <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
                theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black'
                    : 'bg-gradient-to-br from-blue-50 via-white to-orange-50'
            }`}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    {/* Animated Orbs */}
                    <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse ${
                        theme === 'dark'
                            ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20'
                            : 'bg-gradient-to-br from-cyan-400/15 to-blue-500/15'
                    }`}></div>
                    <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-1000 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-500/20 to-indigo-600/20'
                            : 'bg-gradient-to-br from-purple-400/15 to-indigo-500/15'
                    }`}></div>
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse delay-500 ${
                        theme === 'dark'
                            ? 'bg-gradient-to-br from-emerald-500/10 to-teal-600/10'
                            : 'bg-gradient-to-br from-emerald-400/10 to-teal-500/10'
                    }`}></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className={`absolute inset-0 opacity-30 ${
                    theme === 'dark'
                        ? "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"
                        : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDE2NCwgMTE5LCA2MiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
                }`}></div>

                {/* Theme Toggle - Top Right */}
                <div className="absolute top-6 right-6 z-30">
                    <ThemeToggle size="md" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                    <div className="w-full max-w-md">
                        {/* Futuristic Card */}
                        <div className="relative">
                            {/* Glowing Border Effect */}
                            <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 animate-pulse ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500'
                                    : 'bg-gradient-to-r from-[#a4773e] via-blue-500 to-[#a4773e]'
                            }`}></div>

                            {/* Main Card */}
                            <div className={`relative backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${
                                theme === 'dark'
                                    ? 'bg-gray-900/90 border border-gray-700/50'
                                    : 'bg-white/95 border border-gray-200/70'
                            }`}>
                                {/* Header */}
                                <div className="text-center mb-8">
                                    {/* Logo Container */}
                                    <Link href={route('home')} className="inline-block mb-6 group">
                                        <div className="relative">
                                            {/* Logo Glow Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>

                                            {/* Logo Background with Golden Accent */}
                                            <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:border-[#a4773e]/60 transition-all duration-300 mx-auto ${
                                                theme === 'dark'
                                                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-[#a4773e]/30'
                                                    : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-[#a4773e]/40'
                                            }`}>
                                                <img
                                                    src="/image/logo.png"
                                                    alt="BudayaInd Logo"
                                                    className="w-12 h-12 object-contain filter drop-shadow-lg"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                                                        if (fallback) fallback.style.display = 'block';
                                                    }}
                                                />
                                                <span className="hidden text-[#a4773e] font-bold text-2xl tracking-wider" style={{fontFamily: 'Space Grotesk'}}>BI</span>
                                            </div>
                                        </div>
                                    </Link>

                                    <h1 className={`text-3xl font-bold mb-2 ${
                                        theme === 'dark'
                                            ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'
                                            : 'text-gray-800'
                                    }`} style={{fontFamily: 'Space Grotesk'}}>
                                        Bergabung dengan BudayaInd
                                    </h1>
                                    <p className={`text-sm ${
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                    }`}>Mulai perjalanan eksplorasi budaya Indonesia</p>
                                </div>

                                {/* Register Form */}
                                <Form
                                    method="post"
                                    action={route('register')}
                                    resetOnSuccess={['password', 'password_confirmation']}
                                    disableWhileProcessing
                                    className="space-y-6"
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            {/* Name Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className={`text-sm font-medium ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    Nama Lengkap
                                                </Label>
                                                <div className="relative group">
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        name="name"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        autoComplete="name"
                                                        placeholder="Masukkan nama lengkap"
                                                        className={`w-full px-4 py-3 border rounded-xl focus:border-[#a4773e]/60 focus:ring-2 focus:ring-[#a4773e]/20 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-500/70 ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-500'
                                                                : 'bg-gray-50/80 border-gray-300/50 text-gray-900 placeholder-gray-400'
                                                        }`}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                </div>
                                                <InputError message={errors.name} className={`${
                                                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                }`} />
                                            </div>

                                            {/* Email Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className={`text-sm font-medium ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    Email
                                                </Label>
                                                <div className="relative group">
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        required
                                                        tabIndex={2}
                                                        autoComplete="email"
                                                        placeholder="nama@email.com"
                                                        className={`w-full px-4 py-3 border rounded-xl focus:border-[#a4773e]/60 focus:ring-2 focus:ring-[#a4773e]/20 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-500/70 ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-500'
                                                                : 'bg-gray-50/80 border-gray-300/50 text-gray-900 placeholder-gray-400'
                                                        }`}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                </div>
                                                <InputError message={errors.email} className={`${
                                                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                }`} />
                                            </div>

                                            {/* Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password" className={`text-sm font-medium ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    Password
                                                </Label>
                                                <div className="relative group">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        required
                                                        tabIndex={3}
                                                        autoComplete="new-password"
                                                        placeholder="Minimal 8 karakter"
                                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:border-[#a4773e]/60 focus:ring-2 focus:ring-[#a4773e]/20 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-500/70 ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-500'
                                                                : 'bg-gray-50/80 border-gray-300/50 text-gray-900 placeholder-gray-400'
                                                        }`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-[#a4773e] transition-colors duration-200 ${
                                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                        }`}
                                                        tabIndex={-1}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                </div>
                                                <InputError message={errors.password} className={`${
                                                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                }`} />
                                            </div>

                                            {/* Confirm Password Field */}
                                            <div className="space-y-2">
                                                <Label htmlFor="password_confirmation" className={`text-sm font-medium ${
                                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                    Konfirmasi Password
                                                </Label>
                                                <div className="relative group">
                                                    <Input
                                                        id="password_confirmation"
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        name="password_confirmation"
                                                        required
                                                        tabIndex={4}
                                                        autoComplete="new-password"
                                                        placeholder="Masukkan ulang password"
                                                        className={`w-full px-4 py-3 pr-12 border rounded-xl focus:border-[#a4773e]/60 focus:ring-2 focus:ring-[#a4773e]/20 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-500/70 ${
                                                            theme === 'dark'
                                                                ? 'bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-500'
                                                                : 'bg-gray-50/80 border-gray-300/50 text-gray-900 placeholder-gray-400'
                                                        }`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-[#a4773e] transition-colors duration-200 ${
                                                            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                                        }`}
                                                        tabIndex={-1}
                                                    >
                                                        {showConfirmPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/5 to-cyan-500/5 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                </div>
                                                <InputError message={errors.password_confirmation} className={`${
                                                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                                                }`} />
                                            </div>

                                            {/* Submit Button */}
                                            <Button
                                                type="submit"
                                                className="relative w-full py-3 bg-gradient-to-r from-[#a4773e] to-[#d4a574] hover:from-[#8b6635] hover:to-[#a4773e] text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group overflow-hidden"
                                                tabIndex={5}
                                                disabled={processing}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#a4773e]/20 to-[#d4a574]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                <span className="relative flex items-center justify-center">
                                                    {processing && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                                                    {processing ? 'Membuat akun...' : 'Buat Akun'}
                                                </span>
                                            </Button>

                                            {/* Login Link */}
                                            <div className={`text-center pt-4 ${
                                                theme === 'dark' ? 'border-t border-gray-700/50' : 'border-t border-gray-300/30'
                                            }`}>
                                                <p className={`text-sm ${
                                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                    Sudah punya akun?{' '}
                                                    <TextLink
                                                        href={route('login')}
                                                        className="text-[#a4773e] hover:text-[#a4773e]/80 font-medium transition-colors"
                                                        tabIndex={6}
                                                    >
                                                        Masuk sekarang
                                                    </TextLink>
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <Link
                                href={route('home')}
                                className={`text-sm hover:text-[#a4773e] transition-colors inline-flex items-center gap-2 group ${
                                    theme === 'dark' ? 'text-gray-500' : 'text-gray-600'
                                }`}
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                                Kembali ke beranda
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Register() {
    return (
        <ThemeProvider>
            <RegisterContent />
        </ThemeProvider>
    );
}
