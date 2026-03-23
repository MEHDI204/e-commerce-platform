import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <PublicLayout>
            <Head title="Contact Us" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-4">Get in Touch</p>
                    <h1 className="text-4xl md:text-5xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-4">Contact Us</h1>
                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium max-w-lg mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-[#181811] dark:text-white mb-6">Our Information</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: 'mail', label: 'Email', value: 'support@minimal.store' },
                                    { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
                                    { icon: 'location_on', label: 'Address', value: '123 Design Street, Creative City, CA 90210' },
                                    { icon: 'schedule', label: 'Hours', value: 'Mon — Fri: 9AM — 6PM PST' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#f5f5f0] dark:bg-neutral-800 flex items-center justify-center flex-shrink-0">
                                            <span className="material-symbols-outlined text-[#8a8a60] text-lg">{item.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-1">{item.label}</p>
                                            <p className="text-sm font-bold text-[#181811] dark:text-white">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-[#181811] dark:text-white mb-4">Follow Us</h3>
                            <div className="flex gap-3">
                                {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                                    <a key={social} href="#" className="px-4 py-2 rounded-lg border border-[#e6e6db] dark:border-neutral-700 text-xs font-bold text-[#8a8a60] hover:border-primary hover:text-primary transition-colors">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-[#e6e6db] dark:border-neutral-700 p-8">
                        <h2 className="text-xl font-black text-[#181811] dark:text-white mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-sm font-bold text-[#181811] dark:text-white">Name</span>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Your name" />
                                </label>
                                <label className="flex flex-col gap-1.5">
                                    <span className="text-sm font-bold text-[#181811] dark:text-white">Email</span>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="you@email.com" />
                                </label>
                            </div>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-bold text-[#181811] dark:text-white">Subject</span>
                                <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                    className="h-11 px-4 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="How can we help?" />
                            </label>
                            <label className="flex flex-col gap-1.5">
                                <span className="text-sm font-bold text-[#181811] dark:text-white">Message</span>
                                <textarea required rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="px-4 py-3 rounded-lg border border-[#e6e6db] dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[#181811] dark:text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none" placeholder="Your message..." />
                            </label>
                            <button type="submit" className="w-full h-12 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all rounded-lg text-[#181811] text-sm font-bold tracking-tight">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
