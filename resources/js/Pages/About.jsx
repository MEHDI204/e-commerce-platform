import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    const teamMembers = [
        {
            name: 'Elena Rossi',
            role: 'Head of Design',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Lr3GmEEAzWtQii1u-j0DnL7VpdvaVZaVVf7UOJDU-Kqvpq5S2Z1AsOKefInFyPj0MqhFHLpjGs8_7q6oyGWHBb4d3wB33Eh9JXGGZiAWAWb8F7l5NcYUuXVsz8LOzjm4KTY3gS3aDwesrhbykONh7pkXQxqxIBx4tXvP9dOj1riaYzDxMTsSgRGXpINLOIBkSprKDmFbtTiR0tLNoUw8ExFdFoEih6HNUSeQW35N3PP4mO5rqKsqbFZUijwoHY_s8Bg6D8Lfz4I',
        },
        {
            name: 'Marcus Chen',
            role: 'Master Tailor',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYEKREEwDMrTNahJYmd7K5yFRda1h5WW64ZFTK6fsjry__0Jqa_T4H7GbmWov2ud8VvzIwCHJvLRD5MREfXuxvnN2hTLtjF91WW3_kAFo0LN6K8prQP8MRXaWrFEncLHMy3pL4QxxCGwadzCPsIrzFglwlBqAUPBIVFTJ5DvpOB71G_qw62rXWx3ewaZaGrtT_3ZwM1Ct3Q9wmt_VDMd1lGXU4psnkVV5w_kDzj4mbcudJ5fFb2vVVGgA4fHKTjAbMksYJTm1hAKc',
        },
        {
            name: 'Sarah Jenkins',
            role: 'Sustainability Lead',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlfOX8UPJ7Fd0JBgz1hRpBZcK8XTPwtw4_5NzePw-aKv1gSnDMCnTfPffHD4Q8ViEal7E07heAUc888Dk86nXPRyWgYweGCfEcAs6Qz8-bSFZzsCakJo3C1lWJSEquJ1thRc6eMA3KkrM6tPKtOafVIqZ_0OM5tL1f32I0Cuv0TUvXyxnW0XEdPli5a1eIQV9X84XRXN_80-I3t32nb19wlNkPnWQPbYS0q441KhdL9T4Kbtp3XADcnOUlXedybmx0HfzceMH3fOg',
        },
        {
            name: 'David Okafor',
            role: 'Creative Director',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJP367kEwN14jzC6kwAMMyViYR-O_W956CZGi2jZLlikCqyexs72x2CBEZc6jI2eQQUdkzrlh4xiayVPxg8pa8iSFPByj129lc-oCPXvrKSo_u-nMTtNxqjlfIw8-P1cgNhEQRi_623HIRADOqLwqZ29Hg62laBp0R3OpjphCkr_9qVOCD5AMW6H5tO98LDxMg2Q32SLL7tMpWn37cKZD0SYXBBRZuJWmhMOlMIoHhBmbs-HxUz_qob1f-w8stRtyfo_SEQXiB0rk',
        },
    ];

    const coreValues = [
        { icon: 'globe', title: 'Ethical Sourcing', desc: 'We trace every fiber back to its origin. Transparency isn\'t just a buzzword; it\'s our promise to the planet and its people.' },
        { icon: 'schedule', title: 'Timeless Design', desc: 'We ignore the calendar of fashion weeks. We create pieces designed to remain relevant for decades, not days.' },
        { icon: 'handyman', title: 'Master Craftsmanship', desc: 'Hand-finished details that machines simply cannot replicate. We celebrate the imperfection of the human touch.' },
    ];

    const stats = [
        { value: '12+', label: 'Years of Craft' },
        { value: '100%', label: 'Ethical Materials' },
        { value: '0', label: 'Compromises' },
        { value: 'Global', label: 'Community' },
    ];

    return (
        <PublicLayout>
            <Head title="About Us" />

            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-10 md:py-20">
                <div className="flex flex-col max-w-[1200px] w-full">
                    <div className="relative w-full min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center text-center p-8 rounded-xl overflow-hidden group">
                        <div
                            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB5YbdctYtQa7XvsmKygW8DFT7d9Hu9EvXXLVa2CPFESPjAtfWo6VPkqfbE__e8zJMp_JYZ-rA9cYklAv0NWV-pXfcofLMngJYrKLDWiZwiRDj3c8r2SnyqOun9FkXkXQnJfu-5HKh6ddK98tQ1HnNv9-40dcpsSomWVo0Bm0X_esWujv13X7lNKwF1JYSRNaiUKfUtcJ4p7eZVIKv9YGM_lX_mC29IGNPa9un9Idgt4i6WotRFcUcnUZl4ZMPcRlG9b1wJV9ngfFc")' }}
                        />
                        <div className="absolute inset-0 z-0 bg-black/40" />
                        <div className="relative z-10 flex flex-col gap-6 max-w-3xl">
                            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-[-0.02em]">
                                Crafted for the <span className="italic text-primary font-light">Modern</span> Minimalist.
                            </h1>
                            <p className="text-gray-200 text-lg md:text-xl font-normal leading-relaxed max-w-xl mx-auto">
                                Quality over quantity. A dedication to timeless design and ethical craftsmanship in every thread.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Philosophy Narrative */}
            <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-12 md:py-24 bg-white dark:bg-[#1a1a0d]">
                <div className="flex flex-col md:flex-row gap-12 max-w-[1000px] w-full items-center">
                    <div className="flex-1 space-y-6">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm">The Philosophy</span>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#181811] dark:text-white">
                            We believe design should outlast <span className="underline decoration-primary decoration-4 underline-offset-4">trends</span>.
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
                            In a world of fast fashion and fleeting moments, we pause. We curate collections that speak to a slower, more intentional way of living. Every piece is a testament to the belief that fewer, better things make for a richer life.
                        </p>
                        <div className="pt-4">
                            <a className="inline-flex items-center gap-2 text-[#181811] dark:text-white font-bold border-b-2 border-primary hover:bg-primary/10 px-2 py-1 transition-colors" href="#">
                                Read Our Manifesto
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="aspect-[3/4] w-full rounded-lg overflow-hidden relative">
                            <div
                                className="absolute inset-0 bg-cover bg-center grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBNMmMLVrg5AChfk--L5Bo3uaY9X0Xzdup0gz0_tBEciVPWvaIvaNTrD_93rxER9BTekwicaOTE-eO4EUN5r-mauhHvaimKWeJf7k3kOgtAlTTDEyWLXwCaVBhQQ9C0kjPXBgVkdOt6l1VP-esY1pl6M_zHlVt3D6FsbqtpPIuC-0_04Z1oA5Ed5OXbOkzETIjQWCvfzq8NBdgsKdjwlmZYiQJV8LEy7OkrI6yvN5YYd3KHoYi5beDekUazYz8DaTtxhJktkDOol6w")' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values Grid */}
            <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-16 md:py-32 bg-[#f8f8f5] dark:bg-[#222210] border-y border-[#e6e6db] dark:border-gray-800">
                <div className="flex flex-col max-w-[1200px] w-full gap-16">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-[#181811] dark:text-white text-3xl md:text-4xl font-bold">Our Core Values</h2>
                        <p className="text-gray-600 dark:text-gray-400">Principles that guide every stitch, every decision, and every design.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreValues.map((value, i) => (
                            <div key={i} className="flex flex-col gap-4 p-8 bg-white dark:bg-[#1a1a0d] border border-gray-100 dark:border-gray-800 rounded-xl hover:shadow-lg transition-shadow duration-300 group">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-[#181811] dark:text-white group-hover:bg-primary transition-colors">
                                    <span className="material-symbols-outlined">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-[#181811] dark:text-white">{value.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Team / Editorial Gallery */}
            <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-16 md:py-24 bg-white dark:bg-[#1a1a0d]">
                <div className="flex flex-col max-w-[1200px] w-full">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm block mb-2">The Ateliers</span>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#181811] dark:text-white">Faces Behind the Fabric</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-sm font-bold hover:text-primary transition-colors">
                            View All Artisans <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4 relative">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        style={{ backgroundImage: `url("${member.image}")` }}
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-multiply" />
                                </div>
                                <h3 className="text-lg font-bold text-[#181811] dark:text-white group-hover:text-primary/90 transition-colors">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-[#f8f8f5] dark:bg-[#222210] border-y border-[#e6e6db] dark:border-gray-800">
                <div className="max-w-[1200px] mx-auto px-4 md:px-10 flex flex-wrap justify-center md:justify-between gap-8 text-center md:text-left">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex-1 min-w-[200px]">
                            <h3 className="text-4xl md:text-5xl font-black text-[#181811] dark:text-white mb-2">{stat.value}</h3>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 py-24 bg-[#181811] text-white">
                <div className="flex flex-col max-w-[800px] w-full text-center items-center gap-8">
                    <div className="w-16 h-1 bg-primary rounded-full mb-4" />
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                        Ready to build your <br /><span className="text-primary italic font-light">forever</span> wardrobe?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto">
                        Explore our latest collection of essentials, crafted with the same values you just read about.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-8">
                        <button className="bg-primary text-[#181811] font-bold text-lg px-8 py-4 rounded-lg hover:bg-white transition-colors min-w-[200px]">
                            Shop Collection
                        </button>
                        <button className="bg-transparent border border-white text-white font-bold text-lg px-8 py-4 rounded-lg hover:bg-white hover:text-[#181811] transition-colors min-w-[200px]">
                            Read the Journal
                        </button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
