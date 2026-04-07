import React from 'react';
import { motion } from 'framer-motion';

// Definisi tipe untuk Props
interface FooterProps {
    variant?: 'primary' | 'secondary';
}

export default function Footer({ variant = 'primary' }: FooterProps) {
    // Logika penentuan warna berdasarkan variant
    const isPrimary = variant === 'primary';

    // 1. Background footer
    const bgColor = isPrimary ? 'bg-primary' : 'bg-secondary';

    // 2. Warna teks utama
    const textColor = isPrimary ? 'text-secondary' : 'text-primary';

    // 3. Warna border & opacity teks
    const borderColor = isPrimary ? 'border-secondary/20' : 'border-primary/20';
    const mutedTextColor = isPrimary ? 'text-secondary/70' : 'text-primary/70';
    const copyrightColor = isPrimary ? 'text-secondary/80' : 'text-primary/80';

    // 4. Skema warna tombol Pill & CTA
    // Jika bg footer primary (hitam), pill-nya warna putih/secondary.
    // Jika bg footer secondary (putih), pill-nya warna hitam/primary.
    const pillBg = isPrimary
        ? 'bg-gradient-to-b from-secondary via-secondary/80 to-secondary/40 text-primary'
        : 'bg-gradient-to-b from-primary via-primary/80 to-primary/40 text-secondary';

    const ctaBtn = isPrimary
        ? 'bg-secondary text-primary'
        : 'bg-primary text-secondary';

    const socialLinks = [
        { name: 'INSTAGRAM', href: 'https://www.instagram.com/mahaandika_/' },
        {
            name: 'LINKEDIN',
            href: 'https://www.linkedin.com/in/i-gusti-agung-andika/',
        },
        { name: 'WHATSAPP', href: 'https://wa.me/6282340506408?text=Hi!...' },
        { name: 'BEHANCE', href: 'https://www.behance.net/13gungandika/' },
    ];

    const capsuleLinks = [socialLinks[1], socialLinks[0], socialLinks[3]];

    return (
        <footer
            className={`${bgColor} ${textColor} px-6 py-20 transition-colors duration-500 md:px-16 lg:px-24`}
        >
            <div className="mx-auto max-w-7xl">
                {/* --- Top Social Pills --- */}
                <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                    {capsuleLinks.map((item) => (
                        <motion.a
                            key={item.name}
                            href={item.href}
                            target="_blank"
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`${pillBg} flex items-center justify-center rounded-full border-[0.5px] border-white/30 px-4 py-4 font-heading text-[10px] font-bold tracking-[0.4em] shadow-xl transition-all duration-500 last:col-span-2 sm:text-xs md:text-base lg:py-6 lg:last:col-span-1`}
                        >
                            <span className="relative flex h-full w-full items-center justify-center overflow-hidden uppercase">
                                {item.name}
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
                        className="font-heading text-6xl leading-none font-black tracking-tighter sm:text-8xl md:text-9xl lg:text-[12rem]"
                    >
                        GET IN TOUCH
                    </motion.h2>

                    <p
                        className={`mx-auto mt-8 max-w-2xl font-body text-sm font-medium tracking-widest uppercase md:text-base lg:text-lg ${mutedTextColor}`}
                    >
                        I AM AVAILABLE FOR A PROJECT.
                        <span className="block">
                            LOOKING FOR A GRAPHIC DESIGNER OR WEB DEVELOPER?
                            JUST GET IN TOUCH.
                        </span>
                    </p>

                    <div className="mt-12">
                        <a
                            href="https://wa.me/6282340506408"
                            target="_blank"
                            className={`inline-block rounded-full ${ctaBtn} px-10 py-4 font-heading text-sm font-bold transition-all hover:scale-105 hover:shadow-2xl active:scale-95 md:px-12 md:py-5 md:text-base`}
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* --- Bottom Links Area --- */}
                <div className={`mt-20 border-t ${borderColor} pt-12`}>
                    <p
                        className={`mb-8 text-center font-body text-[10px] tracking-[0.3em] uppercase ${copyrightColor}`}
                    >
                        Follow all my accounts:
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 text-center md:flex md:flex-wrap md:justify-center md:gap-x-12">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                className={`font-body text-xs font-bold tracking-widest opacity-60 transition-colors hover:opacity-100`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* --- Copyright Area --- */}
                <div
                    className={`mt-20 flex flex-col items-center justify-between gap-4 border-t ${isPrimary ? 'border-secondary/10' : 'border-primary/10'} pt-8 text-[10px] tracking-widest ${copyrightColor} md:flex-row`}
                >
                    <p>© 2026 AGUNG ANDIKA. ALL RIGHTS RESERVED.</p>
                    <p className="font-medium">BALI, INDONESIA</p>
                </div>
            </div>
        </footer>
    );
}
