import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef } from 'react';

// Sub-komponen untuk animasi per kata
const Word = ({
    children,
    progress,
    range,
}: {
    children: string;
    progress: any;
    range: [number, number];
}) => {
    // 1. Buat transform mentah (0.2 ke 1)
    const opacityRaw = useTransform(progress, range, [0.2, 1]);

    // 2. Bungkus dengan useSpring agar transisinya "lembut" dan smooth
    const opacity = useSpring(opacityRaw, {
        stiffness: 500, // Kekakuan pegas
        damping: 30, // Redaman agar tidak memantul berlebihan
        restDelta: 0.001,
    });

    return (
        <motion.span
            style={{ opacity }}
            className="relative mr-[0.25em] inline-block text-white"
        >
            {children}
        </motion.span>
    );
};

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Memantau progress scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // 'start 0.8': Animasi mulai saat top section berada di 80% layar (hampir muncul)
        // 'end end': Animasi SELESAI saat bagian bawah (end) section menyentuh bagian bawah (end) viewport
        offset: ['start 0.8', 'end end'],
    });

    const marqueeText =
        '✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ';

    const paragraph =
        'I’m someone who enjoys bringing ideas to life through design and code. As a Graphic Designer and Web Developer, I love creating digital experiences that are not only visually appealing but also easy to use and impactful. My goal is to create work that usable for everyone.';
    const words = paragraph.split(' ');

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen flex-col overflow-hidden bg-[#000000]"
        >
            <div className="flex flex-grow flex-col p-8 md:p-16 lg:p-24">
                {/* --- Heading --- */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="font-body text-6xl text-[#FFFFFF] italic md:text-7xl lg:text-9xl"
                    >
                        About
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{
                            duration: 1.2,
                            delay: 0.5,
                            ease: 'circOut',
                        }}
                        className="mt-3 h-px grow bg-white md:h-[2px]"
                    />
                </div>

                {/* --- Kontainer Teks Deskripsi --- */}
                {/* Style flex-col items-center justify-center tetap sesuai permintaan terakhirmu */}
                <div className="mt-10 mb-10 flex grow flex-col items-center justify-center">
                    <p className="font-body text-2xl leading-relaxed italic sm:text-3xl md:text-4xl lg:text-5xl">
                        {words.map((word, i) => {
                            const start = i / words.length;
                            const end = start + 1 / words.length;
                            return (
                                <Word
                                    key={i}
                                    progress={scrollYProgress}
                                    range={[start, end]}
                                >
                                    {word}
                                </Word>
                            );
                        })}
                    </p>
                </div>
            </div>

            {/* --- Marquee --- */}
            <div className="-mt-10 w-full overflow-hidden border-t border-white/10 bg-white py-3 md:py-5">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 20,
                            ease: 'linear',
                        },
                    }}
                    className="flex whitespace-nowrap"
                >
                    <span className="font-heading text-xl font-bold tracking-widest text-black uppercase md:text-3xl">
                        {marqueeText}
                    </span>
                    <span className="font-heading text-xl font-bold tracking-widest text-black uppercase md:text-3xl">
                        {marqueeText}
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
