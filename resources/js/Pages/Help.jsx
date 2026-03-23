import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Help() {
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        { icon: 'local_shipping', title: 'Shipping', desc: 'Delivery times, tracking, and shipping policies' },
        { icon: 'replay', title: 'Returns', desc: '30-day return policy and refund process' },
        { icon: 'credit_card', title: 'Payments', desc: 'Payment methods, security, and billing' },
        { icon: 'inventory_2', title: 'Orders', desc: 'Order status, modifications, and cancellations' },
        { icon: 'verified_user', title: 'Account', desc: 'Profile settings, password, and security' },
        { icon: 'help', title: 'General', desc: 'Product info, care guides, and more' },
    ];

    const faqs = [
        { q: 'How long does shipping take?', a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Free shipping on all orders over $50.' },
        { q: 'What is your return policy?', a: 'We offer a 30-day return policy on all unworn, unwashed items with original tags attached. Simply initiate a return from your account dashboard.' },
        { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can also track from your Orders page in your account.' },
        { q: 'Do you ship internationally?', a: 'Yes! We ship to over 50 countries worldwide. International shipping rates and delivery times vary by location.' },
        { q: 'How do I contact customer support?', a: 'You can reach us via email at support@minimal.store, by phone at +1 (555) 123-4567, or through the Contact Us form.' },
        { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed.' },
    ];

    return (
        <PublicLayout>
            <Head title="Help Center" />
            <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-12 md:py-20">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#8a8a60] dark:text-neutral-400 mb-4">Support</p>
                    <h1 className="text-4xl md:text-5xl font-black text-[#181811] dark:text-white tracking-[-0.03em] mb-4">Help Center</h1>
                    <p className="text-[#8a8a60] dark:text-neutral-400 font-medium max-w-lg mx-auto mb-8">
                        Find answers to common questions or reach out to our team for help.
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-4xl mx-auto">
                    {categories.map((cat, i) => (
                        <div key={i} className="bg-white dark:bg-neutral-800/50 border border-[#e6e6db] dark:border-neutral-700 rounded-2xl p-6 hover:border-primary transition-colors cursor-pointer group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                <span className="material-symbols-outlined text-primary text-xl">{cat.icon}</span>
                            </div>
                            <h3 className="text-sm font-black text-[#181811] dark:text-white mb-1">{cat.title}</h3>
                            <p className="text-xs text-[#8a8a60] dark:text-neutral-400 font-medium">{cat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-black text-[#181811] dark:text-white tracking-[-0.02em]">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border border-[#e6e6db] dark:border-neutral-700 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f5f5f0] dark:hover:bg-neutral-800 transition-colors"
                                >
                                    <span className="text-sm font-bold text-[#181811] dark:text-white pr-4">{faq.q}</span>
                                    <span className="material-symbols-outlined text-[#8a8a60] transition-transform duration-200" style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>
                                        expand_more
                                    </span>
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-4">
                                        <p className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium leading-relaxed">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-20 bg-[#f5f5f0] dark:bg-neutral-800/30 rounded-2xl py-16 px-6">
                    <h2 className="text-2xl font-black text-[#181811] dark:text-white mb-3">Still can't find what you're looking for?</h2>
                    <p className="text-sm text-[#8a8a60] dark:text-neutral-400 font-medium mb-8">Our support team is here to help you.</p>
                    <a href="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-[#d9d900] active:scale-[0.98] transition-all text-[#181811] px-8 py-3 rounded-lg text-sm font-bold tracking-tight">
                        <span className="material-symbols-outlined text-lg">mail</span>
                        Contact Support
                    </a>
                </div>
            </div>
        </PublicLayout>
    );
}
