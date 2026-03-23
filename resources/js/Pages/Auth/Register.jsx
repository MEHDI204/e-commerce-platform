import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />

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
                                <h1 className="text-[#181811] dark:text-white text-4xl font-black leading-tight tracking-[-0.02em]">Create Account</h1>
                                <p className="text-[#8a8a60] dark:text-neutral-400 text-base">Join us to start shopping today.</p>
                            </div>

                            {/* Tabs */}
                            <div className="border-b border-[#e6e6db] dark:border-neutral-700 flex gap-8">
                                <Link
                                    href={route('login')}
                                    className="relative pb-3 text-[#8a8a60] dark:text-neutral-500 text-sm font-bold tracking-wide border-b-[3px] border-transparent hover:text-[#181811] dark:hover:text-white transition-all"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="relative pb-3 text-[#181811] dark:text-white text-sm font-bold tracking-wide border-b-[3px] border-[#181811] dark:border-white transition-all"
                                >
                                    Create Account
                                </Link>
                            </div>

                            {/* Form */}
                            <form onSubmit={submit} className="flex flex-col gap-5">
                                {/* Name Fields */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-[#181811] dark:text-white text-sm font-bold">First Name</span>
                                        <input
                                            type="text"
                                            value={data.first_name}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium"
                                            placeholder="John"
                                            autoComplete="given-name"
                                            autoFocus
                                        />
                                        {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
                                    </label>
                                    <label className="flex flex-col gap-1.5">
                                        <span className="text-[#181811] dark:text-white text-sm font-bold">Last Name</span>
                                        <input
                                            type="text"
                                            value={data.last_name}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium"
                                            placeholder="Doe"
                                            autoComplete="family-name"
                                        />
                                        {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
                                    </label>
                                </div>

                                {/* Email */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-[#181811] dark:text-white text-sm font-bold">Email Address</span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium"
                                        placeholder="name@example.com"
                                        autoComplete="username"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                </label>

                                {/* Password */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-[#181811] dark:text-white text-sm font-bold">Password</span>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium pr-10"
                                            placeholder="••••••••"
                                            autoComplete="new-password"
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

                                {/* Confirm Password */}
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-[#181811] dark:text-white text-sm font-bold">Confirm Password</span>
                                    <input
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white placeholder-[#8a8a60] focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all font-medium"
                                        placeholder="••••••••"
                                        autoComplete="new-password"
                                    />
                                    {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 flex w-full items-center justify-center rounded-lg h-12 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all text-[#181811] text-base font-bold tracking-tight shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Creating account...' : 'Create Account'}
                                </button>
                            </form>

                            {/* Footer Text */}
                            <p className="text-center text-sm text-[#8a8a60] dark:text-neutral-500 font-medium">
                                Already have an account?{' '}
                                <Link href={route('login')} className="text-[#181811] dark:text-white underline underline-offset-2 hover:text-primary transition-colors font-bold">Sign In</Link>
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
