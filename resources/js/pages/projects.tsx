import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/footer';

export default function ProjectsPage() {
    const [filter, setFilter] = useState('All');
    const name = 'Agung Andika';

    const categories = [
        'All',
        'Branding',
        'Web Design',
        'Development',
        'Support',
        'SEO',
    ];

    const projects = [
        {
            id: 1,
            title: 'NovaTech Rebrand',
            client: 'NovaTech',
            category: 'Branding',
            tags: ['Branding & Identity'],
            image: '/path-to-your-image1.jpg', // Ganti dengan path image Anda
        },
        {
            id: 2,
            title: 'Lumiere Fashion Website',
            client: 'Lumiere Fashion',
            category: 'Web Design',
            tags: ['Website Design & Development', 'Digital Marketing'],
            image: '/path-to-your-image2.jpg',
        },
        // Tambahkan project lainnya di sini
    ];

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

    const filteredProjects =
        filter === 'All'
            ? projects
            : projects.filter((p) => p.category === filter);

    return (
        <main className="min-h-screen bg-primary px-6 py-20 text-secondary md:px-16 lg:px-24">
            <a href="/">
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 cursor-default cursor-pointer items-center space-x-2 md:top-8 md:space-x-3"
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
            </a>
            <div className="mx-auto max-w-7xl">
                {/* --- Header Section --- */}
                <header className="mb-20 flex flex-col justify-between gap-8 lg:mt-5 lg:flex-row lg:items-end">
                    <div className="max-w-3xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-heading text-6xl font-black md:text-8xl"
                        >
                            Bold Ideas, <br />
                            <span className="text-secondary/50">
                                Stunning Results
                            </span>
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-sm font-body text-sm leading-relaxed text-secondary/70 md:text-base"
                    >
                        From branding transformations to digital experiences,
                        our work is a testament to innovation, strategy, and
                        design excellence.
                    </motion.p>
                </header>

                {/* --- Filter System --- */}
                <nav className="no-scrollbar mb-16 overflow-x-auto border-b border-secondary/10">
                    <ul className="flex min-w-max gap-8 pb-4 md:gap-12">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => setFilter(cat)}
                                    className={`relative cursor-pointer font-heading text-xl font-bold transition-all md:text-2xl ${
                                        filter === cat
                                            ? 'text-secondary'
                                            : 'text-secondary/30 hover:text-secondary/60'
                                    }`}
                                >
                                    {cat}
                                    {filter === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute right-0 -bottom-[17px] left-0 h-1 bg-secondary"
                                        />
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* --- Projects Grid --- */}
                <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.article
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="group cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-secondary/5">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.33, 1, 0.68, 1],
                                        }}
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Arrow Overlay */}
                                    <div className="absolute top-6 right-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="rounded-full bg-primary p-3">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="mb-1 font-heading text-2xl font-bold group-hover:underline md:text-3xl">
                                            {project.title}
                                        </h3>
                                        <p className="mb-4 font-medium text-secondary/50">
                                            {project.client}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="border border-secondary/10 bg-secondary/5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-secondary/20 transition-colors group-hover:text-secondary">
                                        <svg
                                            width="32"
                                            height="32"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
