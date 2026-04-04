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
        <footer className="bg-secondary px-6 py-20 text-white md:px-16 lg:px-24">
            <div className="mx-auto max-w-7xl">
                {/* --- Top Social Pills --- */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                    {['DRIBBBLE', 'INSTAGRAM', 'LINKEDIN'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="rounded-full border border-white/20 px-8 py-3 font-heading text-sm font-bold tracking-widest transition-all hover:bg-white hover:text-black md:text-base"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* --- Main CTA Section --- */}
                <div className="mt-20 text-center">
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="font-heading text-6xl font-black tracking-tighter sm:text-8xl md:text-9xl lg:text-[12rem]"
                    >
                        GET IN TOUCH
                    </motion.h2>

                    <p className="mx-auto mt-8 max-w-2xl font-body text-sm font-medium tracking-wide text-gray-400 uppercase md:text-base lg:text-lg">
                        I AM AVAILABLE FOR A FREELANCE PROJECT THIS YEAR.
                        LOOKING FOR A UI DESIGNER?
                        <span className="block">JUST GET IN TOUCH.</span>
                    </p>

                    <div className="mt-12">
                        <a
                            href="mailto:your@email.com"
                            className="inline-block rounded-full bg-white px-10 py-4 font-heading text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 md:px-12 md:py-5 md:text-base"
                        >
                            Contact Me
                        </a>
                    </div>
                </div>

                {/* --- Bottom Links Area --- */}
                <div className="mt-32 border-t border-white/10 pt-12">
                    <p className="mb-8 text-center font-body text-[10px] tracking-[0.3em] text-gray-500 uppercase">
                        Follow all my accounts:
                    </p>

                    <div className="grid grid-cols-2 gap-y-6 text-center md:flex md:flex-wrap md:justify-center md:gap-x-12">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-body text-xs font-bold tracking-widest text-gray-400 transition-colors hover:text-white"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>

                {/* --- Copyright / Extra --- */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] tracking-widest text-gray-600 md:flex-row">
                    <p>© 2026 YOURPORTFOLIO. ALL RIGHTS RESERVED.</p>
                    <p>BALI, INDONESIA</p>
                </div>
            </div>
        </footer>
    );
}
