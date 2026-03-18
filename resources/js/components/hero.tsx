import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export default function Hero() {
    // Daftar kata yang akan berganti di baris terakhir
    const words = ['Creation', 'Innovation', 'Solution', 'Experience'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            const fullText = words[currentWordIndex];

            if (!isDeleting) {
                // Mode Mengetik
                setDisplayedText(
                    fullText.substring(0, displayedText.length + 1),
                );
                setSpeed(100); // Kecepatan normal saat mengetik

                if (displayedText === fullText) {
                    // Jika sudah selesai mengetik satu kata, diam sebentar sebelum hapus
                    setTimeout(() => setIsDeleting(true), 2000);
                    setSpeed(500); // Jeda diam
                }
            } else {
                // Mode Menghapus
                setDisplayedText(
                    fullText.substring(0, displayedText.length - 1),
                );
                setSpeed(50); // Kecepatan lebih tinggi saat menghapus (seperti backspace)

                if (displayedText === '') {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                    setSpeed(200);
                }
            }
        };

        const timer = setTimeout(handleTyping, speed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIndex]);

    const staticLines = ['Turn', 'Concept', 'Into'];

    return (
        <section className="relative flex h-screen min-h-[600px] flex-col justify-between overflow-hidden bg-primary p-6 md:flex-row md:items-center md:p-12">
            {/* --- Logo Header (Agung Andika) --- */}
            <div className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 items-center space-x-2 md:top-8 md:space-x-3">
                <span className="text-lg text-secondary md:text-xl">✦</span>
                <span className="font-heading text-xl tracking-tight whitespace-nowrap text-secondary md:text-3xl">
                    Agung Andika
                </span>
                <span className="text-lg text-secondary md:text-xl">✦</span>
            </div>

            {/* --- SISI KIRI: Headline & Paragraf --- */}
            <div className="z-10 mt-15 flex flex-col items-center text-center md:mt-0 md:w-1/3 md:items-start md:text-left">
                <motion.h1 className="font-heading text-2xl leading-[1.1] text-secondary sm:text-4xl md:text-6xl lg:text-8xl">
                    {/* 1. Baris Statis (Turn, Concept, Into) */}
                    {staticLines.map((line, idx) => (
                        <React.Fragment key={idx}>
                            <span className="inline-block">
                                {line.split('').map((char, charIdx) => (
                                    <motion.span
                                        key={charIdx}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.05,
                                            delay: idx * 0.4 + charIdx * 0.05,
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </span>
                            <span className="md:hidden"> </span>
                            <br className="hidden md:block" />
                        </React.Fragment>
                    ))}

                    {/* 2. Baris Dinamis (Loop Typing & Deleting) */}
                    <span className="inline-block min-h-[1em] text-secondary">
                        {displayedText.split('').map((char, charIdx) => (
                            <motion.span
                                key={charIdx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.05 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                        {/* Kursor yang aktif hanya di baris dinamis ini */}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="ml-1 inline-block h-[0.7em] w-[2px] bg-secondary align-middle md:w-[3px]"
                        />
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-3 md:mt-8 md:max-w-sm md:border-t md:border-secondary/20 md:pt-8"
                >
                    <p className="font-body text-sm leading-relaxed text-secondary md:text-lg">
                        I design and build digital experiences that look great
                        and work flawlessly. Turning ideas into engaging,
                        memorable interfaces.
                    </p>
                </motion.div>
                {/* Tombol Explore HANYA muncul di Mobile (dibawah MD) */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 rounded-xl bg-secondary px-6 py-3 font-body text-sm font-semibold text-primary shadow-lg md:hidden"
                >
                    My Creative Journey
                </motion.button>
            </div>

            {/* --- TENGAH: Karakter & Scroll Circle --- */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full items-end justify-center md:relative md:inset-auto md:h-full md:w-1/3">
                <div className="pointer-events-auto relative flex h-full w-full items-end justify-center">
                    <motion.img
                        src="/img/hero.png"
                        alt="Character"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        /* Gambar membesar di MD */
                        className="z-10 mb-0 max-h-[58vh] w-44 object-contain md:max-h-[70vh] md:w-64 lg:max-h-[75vh] lg:w-80"
                    />

                    {/* Setengah Lingkaran Scroll */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        /* Translate disesuaikan agar pas di layar MD ke atas */
                        className="absolute bottom-0 z-20 flex h-32 w-32 translate-y-4 cursor-pointer flex-col items-center rounded-full border border-secondary bg-primary pt-4 shadow-lg sm:translate-y-2/5 md:h-44 md:w-44 md:translate-y-1/2 lg:h-52 lg:w-52"
                    >
                        <span className="font-body text-xs font-bold text-secondary md:mt-4 md:text-sm lg:mt-5 lg:text-base">
                            Scroll More
                        </span>
                        <span className="mt-2 animate-bounce text-lg text-secondary md:mt-3 lg:text-xl">
                            ↓
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* --- SISI KANAN: CTA & Deskripsi (MUNCUL MULAI DARI MD) --- */}
            <div className="z-10 hidden flex-col items-end space-y-6 text-right md:flex md:w-1/3">
                <motion.p
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-lg text-secondary md:max-w-xs lg:max-w-md"
                >
                    Every project is crafted with purpose, balancing design,
                    performance, and usability to help brands stand out and
                    grow.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl bg-secondary px-8 py-4 font-body text-lg font-semibold text-primary transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                >
                    Get in Touch
                </motion.button>
            </div>
        </section>
    );
}
