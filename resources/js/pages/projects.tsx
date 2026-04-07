import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Head, Link } from '@inertiajs/react'; // Tambahkan Link untuk navigasi internal
import Footer from '@/components/footer';

// 1. Terima props 'categories' dan 'projects' dari Controller
export default function ProjectsPage({
    categories,
    projects,
}: {
    categories: any[];
    projects: any[];
}) {
    const [filter, setFilter] = useState('All');
    const name = 'Agung Andika';

    // 2. Gunakan logika filter berdasarkan relasi category dari database
    const filteredProjects =
        filter === 'All'
            ? projects
            : projects.filter((p) => p.category?.name === filter);

    // --- Variants Animation (Tetap Sama) ---
    const containerVariants = { initial: { y: 0 }, hover: { y: 0 } };
    const letterVariants = {
        initial: { y: 20, opacity: 0 },
        animate: (i: any) => ({
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: i * 0.05, ease: 'easeOut' },
        }),
        hover: (i: any) => ({
            y: -8,
            transition: { duration: 0.3, delay: i * 0.02, ease: 'easeOut' },
        }),
    };
    const sparkleVariants = {
        initial: { scale: 0, opacity: 0, rotate: -180 },
        animate: {
            scale: 1,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                delay: 0.5,
                type: 'spring',
                stiffness: 200,
            },
        },
        hover: { rotate: 180, scale: 1.2, transition: { duration: 0.5 } },
    };

    return (
        <>
            <main className="min-h-screen bg-primary px-6 py-20 text-secondary md:px-16 lg:px-24">
                <Head title="Projects" />

                <Link href="/">
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 cursor-pointer items-center space-x-2 md:top-8 md:space-x-3"
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
                                        whiteSpace:
                                            char === ' ' ? 'pre' : 'normal',
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
                </Link>

                <div className="mx-auto mt-12 max-w-7xl">
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
                            From branding transformations to digital
                            experiences, my work reflects a balance of
                            innovation, strategy, and design excellence.
                        </motion.p>
                    </header>

                    {/* --- Filter System Dinamis --- */}
                    <nav className="no-scrollbar mb-16 overflow-x-auto border-b border-secondary/10">
                        <ul className="flex min-w-max gap-8 pb-4 md:gap-12">
                            <li>
                                <button
                                    onClick={() => setFilter('All')}
                                    className={`relative cursor-pointer font-heading text-xl font-bold transition-all md:text-2xl ${filter === 'All' ? 'text-secondary' : 'text-secondary/30 hover:text-secondary/60'}`}
                                >
                                    All
                                    {filter === 'All' && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute right-0 -bottom-[17px] left-0 h-1 bg-secondary"
                                        />
                                    )}
                                </button>
                            </li>
                            {categories.map((cat) => (
                                <li key={cat.id}>
                                    <button
                                        onClick={() => setFilter(cat.name)}
                                        className={`relative cursor-pointer font-heading text-xl font-bold transition-all md:text-2xl ${filter === cat.name ? 'text-secondary' : 'text-secondary/30 hover:text-secondary/60'}`}
                                    >
                                        {cat.name}
                                        {filter === cat.name && (
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

                    {/* --- Projects Grid Dinamis --- */}
                    <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, index) => (
                                <motion.article
                                    layout
                                    key={project.id}
                                    // initial: Posisi awal sebelum terlihat
                                    initial={{ opacity: 0, y: 30 }}
                                    // whileInView: Animasi yang berjalan saat elemen masuk ke layar
                                    whileInView={{ opacity: 1, y: 0 }}
                                    // exit: Animasi saat elemen difilter keluar
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    // viewport: Mengatur kapan animasi dipicu
                                    viewport={{
                                        once: true, // Animasi hanya jalan sekali (tidak berulang saat scroll up/down)
                                        margin: '-50px', // Mulai animasi 50px sebelum elemen benar-benar terlihat (terasa lebih natural)
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        ease: 'easeOut',
                                        // Opsional: berikan sedikit delay berdasarkan urutan jika ingin efek mengalir
                                        delay: (index % 2) * 0.1,
                                    }}
                                    className="group cursor-pointer"
                                >
                                    <Link href={`/projects/${project.id}`}>
                                        {' '}
                                        {/* Sesuaikan route detail Anda */}
                                        <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-secondary/5">
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                transition={{
                                                    duration: 0.6,
                                                    ease: [0.33, 1, 0.68, 1],
                                                }}
                                                // 3. Ambil gambar pertama dari relasi images
                                                src={`/storage/${project.thumbnail}`}
                                                alt={project.title}
                                                className="h-full w-full object-cover"
                                            />
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
                                            <div className="flex-1 pr-4">
                                                {' '}
                                                {/* Tambahkan flex-1 agar teks mengambil ruang yang tersedia */}
                                                <h3 className="mb-3 font-heading text-2xl font-bold group-hover:underline md:text-3xl">
                                                    {project.title}
                                                </h3>
                                                {/* --- Menampilkan Deskripsi dengan batasan --- */}
                                                <p className="mb-4 line-clamp-3 font-body text-sm leading-relaxed text-secondary/60 md:text-base">
                                                    {project.description ||
                                                        'No description available for this project.'}
                                                </p>
                                                {/* Tag Kategori */}
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="border border-secondary/10 bg-secondary/5 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                                                        {project.category?.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow Icon */}
                                            <div className="flex-shrink-0 text-secondary/20 transition-colors group-hover:text-secondary">
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
                                    </Link>
                                </motion.article>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
            <Footer variant="secondary" />
        </>
    );
}
