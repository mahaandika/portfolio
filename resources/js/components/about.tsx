import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

export default function About() {
    const marqueeText =
        '✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ✦ Hire Me ';

    return (
        // Gunakan flex-col dan justify-between agar konten tersebar dengan baik
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#000000]">
            {/* Wrapper konten utama dengan padding agar tidak mepet ke marquee */}
            <div className="flex flex-grow flex-col p-8 md:p-16 lg:p-24">
                {/* --- Container Heading + Line --- */}
                <div className="flex items-center space-x-4 md:space-x-8">
                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="font-body text-6xl text-[#FFFFFF] italic md:text-7xl lg:text-9xl"
                    >
                        About
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1.2,
                            delay: 0.5,
                            ease: 'circOut',
                        }}
                        className="mt-3 h-px grow bg-white md:h-[2px]"
                    />
                </div>

                {/* --- Kontainer Teks Deskripsi --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="mt-10 mb-10 flex grow flex-col items-center justify-center" // Tambahkan margin bottom agar ada jarak sebelum marquee
                >
                    <motion.p
                        variants={itemVariants}
                        className="flex items-center justify-center font-body text-2xl leading-relaxed text-[#DDDDDD] italic sm:text-3xl md:text-4xl lg:text-5xl"
                    >
                        <span className="relative inline-block text-[#FFFFFF] not-italic">
                            I’m someone who enjoys bringing ideas to life
                            through design and code. As a UI/UX Designer and Web
                            Developer, I love creating digital experiences that
                            are not only visually appealing but also easy to use
                            and impactful. My goal is to create work that usable
                            for everyone.
                        </span>
                    </motion.p>
                </motion.div>
            </div>

            {/* --- INFINITE MARQUEE (Paling Bawah) --- */}
            {/* Sekarang menggunakan relative (default) atau cukup tanpa absolute agar mengikuti aliran dokumen */}
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
