import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const sidebarItems = [
        { key: 'profile', label: 'Profile', icon: 'person' },
        { key: 'password', label: 'Security', icon: 'lock' },
        { key: 'delete', label: 'Delete Account', icon: 'delete' },
    ];

    return (
        <PublicLayout>
            <Head title="Profile" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-16">
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="md:w-64 flex-shrink-0">
                        <div className="sticky top-24">
                            {/* User Info */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-full bg-[#f5f5f0] dark:bg-neutral-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-2xl text-[#8a8a60]">person</span>
                                </div>
                                <div>
                                    <p className="text-sm font-black text-[#181811] dark:text-white">{auth.user.name}</p>
                                    <p className="text-xs text-[#8a8a60] dark:text-neutral-400 font-medium">{auth.user.email}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-1">
                                {sidebarItems.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => setActiveTab(item.key)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            activeTab === item.key
                                                ? 'bg-[#f5f5f0] dark:bg-neutral-800 text-[#181811] dark:text-white font-bold'
                                                : 'text-[#8a8a60] hover:text-[#181811] dark:hover:text-white hover:bg-[#f5f5f0] dark:hover:bg-neutral-800'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-lg">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                                <Link
                                    href={route('orders.index')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#8a8a60] hover:text-[#181811] dark:hover:text-white hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">receipt_long</span>
                                    Orders
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">logout</span>
                                    Logout
                                </button>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-2">Personal Information</h1>
                                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium text-sm">Update your personal details.</p>
                                </div>
                                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                        className="max-w-full"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Password Tab */}
                        {activeTab === 'password' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-2">Security</h1>
                                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium text-sm">Keep your account safe by updating your password.</p>
                                </div>
                                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                                    <UpdatePasswordForm className="max-w-full" />
                                </div>
                            </div>
                        )}

                        {/* Delete Tab */}
                        {activeTab === 'delete' && (
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-2">Delete Account</h1>
                                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium text-sm">Permanently delete your account and all data.</p>
                                </div>
                                <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6">
                                    <DeleteUserForm className="max-w-full" />
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PublicLayout>
    );
}