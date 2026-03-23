import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Current Password</label>
                    <input
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
                        autoComplete="current-password"
                    />
                    {errors.current_password && <p className="mt-1.5 text-sm text-red-500">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">New Password</label>
                    <input
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
                        autoComplete="new-password"
                    />
                    {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && <p className="mt-1.5 text-sm text-red-500">{errors.password_confirmation}</p>}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center h-11 px-6 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all rounded-lg text-[#181811] text-sm font-bold tracking-tight disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Update Password'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400 font-bold">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
