import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div>
                <p className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium leading-relaxed">
                    Once your account is deleted, all of its resources and data will be permanently deleted.
                    Before deleting your account, please download any data or information that you wish to retain.
                </p>
            </div>

            <button
                onClick={confirmUserDeletion}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all rounded-lg text-white text-sm font-bold tracking-tight"
            >
                <span className="material-symbols-outlined text-lg">delete</span>
                Delete Account
            </button>

            {/* Confirmation Modal */}
            {confirmingUserDeletion && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>

                    {/* Modal Content */}
                    <div className="relative bg-white dark:bg-neutral-800 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-6 w-full max-w-md shadow-2xl">
                        <form onSubmit={deleteUser}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
                                </div>
                                <h2 className="text-lg font-black text-[#181811] dark:text-white">
                                    Delete Account
                                </h2>
                            </div>

                            <p className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium mb-6">
                                Are you sure? This action cannot be undone. Please enter your password to confirm.
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                    placeholder="Enter your password"
                                    autoFocus
                                />
                                {errors.password && <p className="mt-1.5 text-sm text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="h-11 px-5 rounded-lg border border-[#e6e6db] dark:border-neutral-700 text-sm font-bold text-[#181811] dark:text-white hover:bg-[#f5f5f0] dark:hover:bg-neutral-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 px-5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Deleting...' : 'Delete Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
