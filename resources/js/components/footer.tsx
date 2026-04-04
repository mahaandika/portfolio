import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
    const socialLinks = [
        { name: 'INSTAGRAM', href: '#' },
        { name: 'LINKEDIN', href: '#' },
        { name: 'DRIBBBLE', href: '#' },
        { name: 'MEDIUM', href: '#' },
        { name: 'FIGMA COMMUNITY', href: '#' },
        { name: 'TDTHINKER', href: '#' },
    ];

    return (
        /* Latar belakang menggunakan Primary, teks utama menggunakan Secondary */
        <footer className="bg-primary px-6 py-20 text-secondary md:px-16 lg:px-24">
            <div className="mx-auto max-w-7xl">
                {/* --- Top Social Pills --- */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                    {['BEHANCE', 'INSTAGRAM', 'LINKEDIN'].map((item) => (
                        <motion.a
                            key={item}
                            href="#"
                            /* Menambahkan framer-motion pada tag 'a' untuk animasi hover yang lebih smooth */
                            whileHover={{
                                y: -8, // Mengangkat tombol ke atas
                                scale: 1.02,
                                transition: { duration: 0.1, ease: 'easeOut' },
                            }}
                            className="/* Shadow dibuat lebih dalam saat idle */ /* HOVER: Fokus pada bayangan (Shadow) bukan warna */ ,inset_0_2px_10px_rgba(255,255,255,0.5)] flex items-center justify-center rounded-full border-[0.5px] border-white/30 bg-gradient-to-b from-secondary via-secondary/80 to-secondary/40 px-4 py-4 font-heading text-[10px] font-bold tracking-[0.4em] text-primary shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.4)] transition-all duration-500 ease-in-out last:col-span-2 sm:text-xs md:text-base lg:py-6 lg:last:col-span-1"
                        >
                            <span className="relative flex h-full w-full items-center justify-center overflow-hidden">
                                {item}

                                {/* Efek Kilatan Cahaya yang berjalan otomatis atau saat hover */}
                                <motion.div
                                    initial={{ x: '-150%', skewX: -45 }}
                                    whileHover={{ x: '200%' }}
                                    transition={{
                                        duration: 1,
                                        ease: 'easeInOut',
                                    }}
                                    className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md"
                                />
                            </span>
                        </motion.a>
                    ))}
                </div>

                {/* --- Main CTA Section --- */}
                <div className="mt-20 text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        /* Text menggunakan Secondary */
                        className="font-heading text-6xl leading-none font-black tracking-tighter text-secondary sm:text-8xl md:text-9xl lg:text-[12rem]"
                    >
                        GET IN TOUCH
                    </motion.h2>

                    <p className="mx-auto mt-8 max-w-2xl font-body text-sm font-medium tracking-widest text-secondary/70 uppercase md:text-base lg:text-lg">
                        I AM AVAILABLE FOR A FREELANCE PROJECT THIS YEAR.
                        <span className="block">
                            LOOKING FOR A UI DESIGNER? JUST GET IN TOUCH.
                        </span>
                    </p>

                    <div className="mt-12">
                        <a
                            href="mailto:your@email.com"
                            /* Tombol menggunakan warna secondary sebagai background, teksnya warna primary */
                            className="inline-block rounded-full bg-secondary px-10 py-4 font-heading text-sm font-bold text-primary transition-all hover:scale-105 hover:shadow-2xl active:scale-95 md:px-12 md:py-5 md:text-base"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* --- Bottom Links Area --- */}
                <div className="mt-32 border-t border-secondary/20 pt-12">
                    <p className="mb-8 text-center font-body text-[10px] tracking-[0.3em] text-secondary/50 uppercase">
                        Follow all my accounts:
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 text-center md:flex md:flex-wrap md:justify-center md:gap-x-12">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-body text-xs font-bold tracking-widest text-secondary/60 transition-colors hover:text-secondary"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* --- Copyright Area --- */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-secondary/10 pt-8 text-[10px] tracking-widest text-secondary/40 md:flex-row">
                    <p>© 2026 YOURPORTFOLIO. ALL RIGHTS RESERVED.</p>
                    <p className="font-medium">BALI, INDONESIA</p>
                </div>
            </div>
        </footer>
    );
}
