import {
    AnimatePresence,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from 'framer-motion';
import React, { useEffect, useState } from 'react';

export default function Hero() {
    // 1. Tangkap progress scroll (0 sampai 1)
    const { scrollY } = useScroll();

    // 2. Buat transformasi berdasarkan jarak scroll (pixel)
    // Saat scroll 0px -> 500px:
    // 1. Definisikan nilai mentah (Raw) menggunakan useTransform
    const rawTextY = useTransform(scrollY, [0, 500], [0, -100]);
    const rawCharY = useTransform(scrollY, [0, 500], [0, 50]);
    const rawOpacityHero = useTransform(scrollY, [0, 300], [1, 0]);
    const rawScaleChar = useTransform(scrollY, [0, 500], [1, 1.5]);
    const rawScrollBtnOpacity = useTransform(scrollY, [0, 100], [1, 0]);
    const rawScrollBtnY = useTransform(scrollY, [0, 100], [0, 50]);

    // 2. Bungkus semuanya dengan useSpring
    const springConfig = {
        stiffness: 100,
        damping: 10,
        mass: 1,
        restDelta: 0.001,
    };

    const textY = useSpring(rawTextY, springConfig);
    const charY = useSpring(rawCharY, springConfig);
    const opacityHero = useSpring(rawOpacityHero, springConfig);
    const scaleChar = useSpring(rawScaleChar, springConfig);
    const scrollBtnOpacity = rawScrollBtnOpacity;
    const scrollBtnY = rawScrollBtnY;

    // Daftar kata yang akan berganti di baris terakhir
    const words = ['Creation', 'Vision', 'Solution', 'Perfection'];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [speed, setSpeed] = useState(100);
    const name = 'Agung Andika';

    // Varian untuk kontainer (parent) agar bisa men-trigger semua anak (ikon & huruf)
    const containerVariants = {
        initial: { y: 0 },
        hover: { y: 0 },
    };

    const letterVariants = {
        // --- Animasi Saat Pertama Kali Muncul ---
        initial: {
            y: 20,
            opacity: 0,
        },
        animate: (i: any) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: i * 0.05, // Efek muncul satu per satu
                ease: 'easeOut',
            },
        }),
        // --- Animasi Saat Hover ---
        hover: (i: any) => ({
            y: -8,
            transition: {
                duration: 0.3,
                delay: i * 0.02, // Kecepatan gelombang saat hover lebih cepat
                ease: 'easeOut',
            },
        }),
    };

    const sparkleVariants = {
        initial: {
            scale: 0,
            opacity: 0,
            rotate: -180,
        },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                delay: 0.5, // Muncul setelah teks mulai terlihat
                type: 'spring',
                stiffness: 200,
            },
        },
        hover: {
            rotate: 180,
            scale: 1.2,
            transition: { duration: 0.5 },
        },
    };

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

    const handleCV = () => {
        const link = document.createElement('a');
        link.href = '/docs/CV_agungAndika.pdf';
        link.target = '_blank';
        // link.download = 'CV_Agung_Andika.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="relative flex h-screen min-h-[600px] flex-col justify-between overflow-hidden bg-primary p-6 md:flex-row md:items-center md:p-12">
            {/* --- Logo Header (Agung Andika) --- */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 cursor-default items-center space-x-2 md:top-8 md:space-x-3"
            >
                <motion.span
                    variants={sparkleVariants}
                    className="text-lg text-secondary md:text-xl"
                >
                    ✦
                </motion.span>

                <h1 className="flex font-heading text-xl tracking-tight text-secondary md:text-3xl">
                    {name.split('').map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            className="inline-block"
                            style={{
                                whiteSpace: char === ' ' ? 'pre' : 'normal',
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>

                <motion.span
                    variants={sparkleVariants}
                    className="text-lg text-secondary md:text-xl"
                >
                    ✦
                </motion.span>
            </motion.div>

            {/* --- SISI KIRI: Headline & Paragraf --- */}
            <motion.div
                style={{ y: textY, opacity: opacityHero }}
                className="z-10 mt-15 flex flex-col items-center text-center md:mt-0 md:w-1/3 md:items-start md:text-left"
            >
                <motion.h1 className="font-heading text-xl leading-[1.1] text-secondary sm:text-4xl md:text-6xl lg:text-8xl">
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
                    onClick={handleCV}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 cursor-pointer rounded-xl bg-secondary px-6 py-3 font-body text-sm font-semibold text-primary shadow-lg md:hidden"
                >
                    My Creative Journey
                </motion.button>
            </motion.div>

            {/* --- TENGAH: Karakter & Scroll Circle --- */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-full items-end justify-center md:relative md:inset-auto md:h-full md:w-1/3">
                <div className="pointer-events-auto relative flex h-full w-full items-end justify-center">
                    <motion.img
                        style={{ y: charY, scale: scaleChar }}
                        src="/img/hero.png"
                        alt="Character"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        /* Gambar membesar di MD */
                        className="z-10 mb-0 max-h-[58vh] w-44 object-contain md:-mb-10 md:max-h-[70vh] md:w-64 lg:max-h-[80vh] lg:w-80"
                    />

                    {/* Setengah Lingkaran Scroll */}
                    <motion.div
                        onClick={() =>
                            window.scrollTo({
                                top: window.innerHeight,
                                behavior: 'smooth',
                            })
                        }
                        style={{ opacity: scrollBtnOpacity, y: scrollBtnY }}
                        /* scale sedikit saat hover agar tetap interaktif */
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        /* Menggunakan bottom-0 agar menempel sempurna di bawah */
                        className="absolute bottom-0 z-20 flex cursor-pointer items-center space-x-4 bg-secondary px-10 py-5 whitespace-nowrap shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.1)] transition-all md:-mb-12 md:px-14 md:py-6"
                    >
                        <span className="font-heading text-sm font-bold tracking-widest text-primary uppercase md:text-base">
                            Keep Scrolling
                        </span>

                        <motion.span
                            /* Animasi panah ke bawah (karena ini scroll) */
                            animate={{ y: [0, 5, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: 'easeInOut',
                            }}
                            className="text-lg text-primary md:text-xl"
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                </div>
            </div>

            {/* --- SISI KANAN: CTA & Deskripsi (MUNCUL MULAI DARI MD) --- */}
            <motion.div
                style={{ y: textY, opacity: opacityHero }}
                className="z-10 hidden flex-col items-end space-y-6 text-right md:flex md:w-1/3"
            >
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
                    onClick={handleCV}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-xl bg-secondary px-8 py-4 font-body text-lg font-semibold text-primary transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)] md:text-sm lg:text-base"
                >
                    My Creative Journey
                </motion.button>
            </motion.div>
        </section>
    );
}
