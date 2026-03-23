import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />

            <div className="flex min-h-screen w-full flex-row overflow-hidden font-display bg-background-light dark:bg-background-dark text-[#181811] dark:text-white antialiased">
                {/* Left Side: Lifestyle Image */}
                <div className="hidden lg:block lg:w-1/2 relative bg-neutral-900">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq5IKP3foN7xpwbrFTtcQVGy4lND1nprB4Ug-WXVrGpRIcElKEd8lYmsR16lDrYIxfTVP5SBWkonyOMCaeadsj2s_xQZoSYUv7iXN4S3yBHpagecd1q2ZuPADUOSetYIpjWQ6g8c9GGTekQv4aDtC0qNvRapvw3kz84ICrxfrmpfXs7eUYFVcUu4vyLS15EOmGHEgWSCZMSKJ5kmX84psxNrmH8E7tAs5KSTh8cFwKmnhI5Oz7WOcXuzsffTd1TC86fQVVGLTMYHE')" }}
                    ></div>
                    <div className="absolute inset-0 bg-black/20 backdrop-brightness-95"></div>
                    <div className="absolute bottom-0 left-0 p-12 w-full text-white bg-gradient-to-t from-black/80 to-transparent">
                        <blockquote className="text-2xl font-bold leading-tight max-w-md">
                            "Fashion is the armor to survive the reality of everyday life."
                        </blockquote>
                        <p className="mt-4 text-sm font-medium opacity-90">— Bill Cunningham</p>
                    </div>
                </div>

                {/* Right Side: Auth Form */}
                <div className="w-full lg:w-1/2 flex flex-col bg-white dark:bg-background-dark relative h-screen overflow-y-auto">
                    {/* Minimal Nav */}
                    <header className="w-full px-8 py-6 flex justify-between items-center">
                        <Link href={route('home')} className="flex items-center gap-3 text-[#181811] dark:text-white group">
                            <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-black">
                                <span className="material-symbols-outlined text-[20px] font-bold">shopping_bag</span>
                            </div>
                            <span className="text-xl font-black tracking-tight group-hover:opacity-80 transition-opacity">E-Store</span>
                        </Link>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 py-8">
                        <div className="max-w-[480px] w-full mx-auto flex flex-col gap-8">
                            {/* Headlines */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-[#181811] dark:text-white text-4xl font-black leading-tight tracking-[-0.02em]">Welcome Back</h1>
                                <p className="text-[#8a8a60] dark:text-neutral-400 text-base">Enter your details to access your account.</p>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-[#e6e6db] dark:border-neutral-700 flex gap-8">
                                <Link
                                    href={route('login')}
                                    className="relative pb-3 text-[#181811] dark:text-white text-sm font-bold tracking-wide border-b-[3px] border-[#181811] dark:border-white transition-all"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="relative pb-3 text-[#8a8a60] dark:text-neutral-500 text-sm font-bold tracking-wide border-b-[3px] border-transparent hover:text-[#181811] dark:hover:text-white transition-all"
                                >
                                    Create Account
                                </Link>
                            </div>

                            {status && (
                                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
                                    {status}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={submit} className="flex flex-col gap-5">
                                {/* Email Input */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-[#181811] dark:text-white text-sm font-bold">Email Address</span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium"
                                        placeholder="name@example.com"
                                        autoComplete="username"
                                        autoFocus
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </label>

                                {/* Password Input */}
                                <label className="flex flex-col gap-1.5">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#181811] dark:text-white text-sm font-bold">Password</span>
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-xs font-bold text-[#8a8a60] hover:text-[#181811] dark:text-neutral-400 dark:hover:text-primary transition-colors"
                                            >
                                                Forgot Password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium pr-10"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a60] hover:text-[#181811] dark:hover:text-white transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? 'visibility' : 'visibility_off'}
                                            </span>
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                                </label>

                                {/* Primary Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 flex w-full items-center justify-center rounded-lg h-12 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all text-[#181811] text-base font-bold tracking-tight shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#e6e6db] dark:border-neutral-700"></div>
                                </div>
                                <span className="relative bg-white dark:bg-background-dark px-4 text-xs font-bold text-[#8a8a60] uppercase tracking-wider">Or continue with</span>
                            </div>

                            {/* Social Login */}
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-[#f8f8f5] dark:hover:bg-neutral-700 transition-colors text-[#181811] dark:text-white text-sm font-bold">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 h-11 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:bg-[#f8f8f5] dark:hover:bg-neutral-700 transition-colors text-[#181811] dark:text-white text-sm font-bold">
                                    <svg className="w-5 h-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.15-.04-.21.02-1.35.586-2.63 1.293-3.46.722-.84 1.93-1.39 3.1-1.39.047 0 .09.006.11.008h.002zM14.076 7.85c.342 0 .979.126 1.29.126.93 0 2.388-1.28 4.02-1.28 1.642 0 2.274 1.187 2.274 1.187s-1.25.64-1.25 1.92c0 1.53 1.343 2.05 1.343 2.05s-.946 2.65-2.235 4.54c-.66.97-1.36 1.94-2.43 1.94-1.037 0-1.38-.61-2.583-.61-1.22 0-1.61.61-2.618.61-1.02 0-1.832-1.03-2.51-2.02-1.37-2.01-2.427-5.71-1.015-8.15.702-1.21 1.954-1.98 3.314-1.98.86 0 1.666.58 2.19.58h.21z"/>
                                    </svg>
                                    Apple
                                </button>
                            </div>

                            {/* Footer Text */}
                            <p className="text-center text-sm text-[#8a8a60] dark:text-neutral-500 font-medium">
                                By continuing, you agree to our{' '}
                                <Link href="#" className="text-[#181811] dark:text-white underline underline-offset-2 hover:text-primary transition-colors">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="#" className="text-[#181811] dark:text-white underline underline-offset-2 hover:text-primary transition-colors">Privacy Policy</Link>.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
