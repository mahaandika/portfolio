import { motion } from 'framer-motion';
import React from 'react';

// Varian animasi (tetap sama)
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
    return (
        <section className="relative flex min-h-screen flex-col bg-[#000000] p-8 md:p-16 lg:p-24">
            {/* --- Container Heading + Line --- */}
            <div className="flex items-center space-x-4 md:space-x-8">
                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="font-body text-6xl text-[#FFFFFF] md:text-7xl lg:text-9xl"
                >
                    About
                </motion.h1>

                {/* --- Garis Horizontal Responsif --- */}
                <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.5, ease: 'circOut' }}
                    className="mt-3 h-px grow bg-white md:h-[2px]"
                />
            </div>

            {/* --- Kontainer Teks Deskripsi (Tengah Halaman) --- */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
                className="mt-10 flex grow flex-col"
            >
                <motion.p
                    variants={itemVariants}
                    className="font-body text-2xl leading-relaxed text-[#DDDDDD] italic sm:text-3xl md:text-4xl lg:text-5xl"
                >
                    <span className="relative inline-block text-[#FFFFFF] not-italic">
                        I’m someone who enjoys bringing ideas to life through
                        design and code. As a UI/UX Designer and Web Developer,
                        I love creating digital experiences that are not only
                        visually appealing but also easy to use and impactful.
                    </span>
                </motion.p>
            </motion.div>
        </section>
    );
}
