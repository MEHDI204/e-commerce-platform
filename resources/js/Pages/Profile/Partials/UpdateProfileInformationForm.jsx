import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoFocus
                        autoComplete="name"
                    />
                    {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#181811] dark:text-white mb-1.5">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="w-full h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm font-medium focus:ring-2 focus:ring-primary focus:border-primary"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm text-[#181811] dark:text-white font-medium">
                            Your email address is unverified.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-primary underline underline-offset-2 hover:opacity-80 font-bold"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your email address.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center h-11 px-6 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all rounded-lg text-[#181811] text-sm font-bold tracking-tight disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
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
