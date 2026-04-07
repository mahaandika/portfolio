import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@/components/footer'; // Import footer yang baru kita buat

export default function ProjectShow({ project }: { project: any }) {
    // State untuk menyimpan URL gambar yang diklik
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <main className="min-h-screen bg-primary text-secondary">
            <Head title={`${project.title} - Project Detail`} />

            {/* Navigation / Header */}
            <nav className="flex items-center justify-between px-6 py-8 md:px-16 lg:px-24">
                <Link
                    href="/projects"
                    className="group flex items-center gap-2 font-body text-sm font-bold tracking-widest uppercase transition-colors hover:text-secondary/60"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="transition-transform group-hover:-translate-x-2"
                    >
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>
                <div className="font-heading text-xl font-bold tracking-tighter">
                    AGUNG ANDIKA{' '}
                    <span className="text-secondary/30">©2026</span>
                </div>
            </nav>

            <article className="mb-5 px-6 py-12 md:px-16 lg:px-24">
                <div className="mx-auto max-w-7xl">
                    {/* Project Title & Category */}
                    <header className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="mb-4 inline-block border border-secondary/20 px-4 py-1 text-[10px] font-bold tracking-[0.3em] uppercase">
                                {project.category?.name || 'General Project'}
                            </span>
                            <h1 className="font-heading text-5xl leading-tight font-black md:text-7xl lg:text-8xl">
                                {project.title}
                            </h1>
                        </motion.div>
                    </header>

                    {/* Main Image / Hero */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mb-20 aspect-video overflow-hidden bg-secondary/5"
                    >
                        <img
                            src={`/storage/${project.thumbnail}`}
                            alt={project.title}
                            className="h-full w-full object-cover"
                        />
                    </motion.div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Sidebar Info */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-12 space-y-8 border-t border-secondary/10 pt-8">
                                <div>
                                    <h4 className="mb-2 text-[10px] font-bold tracking-widest text-secondary/40 uppercase">
                                        Role / Services
                                    </h4>
                                    <p className="font-body text-base">
                                        {project.category?.name}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="mb-2 text-[10px] font-bold tracking-widest text-secondary/40 uppercase">
                                        Year
                                    </h4>
                                    <p className="font-body text-base">
                                        {project.year}
                                    </p>
                                </div>
                                {project.client && (
                                    <div>
                                        <h4 className="mb-2 text-[10px] font-bold tracking-widest text-secondary/40 uppercase">
                                            Client
                                        </h4>
                                        <p className="font-body text-base">
                                            {project.client}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Description Content & dynamic Images */}
                        <div className="lg:col-span-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                // viewport={{ once: true }} // Aktifkan jika ingin animasi hanya sekali
                                className="prose prose-invert max-w-none"
                            >
                                <h3 className="mb-6 font-heading text-3xl font-bold">
                                    The Challenge
                                </h3>
                                <p className="mb-12 font-body text-lg leading-relaxed text-secondary/80">
                                    {project.description}
                                </p>

                                {/* --- Bagian Gambar Tambahan Dinamis --- */}
                                {project.images && project.images.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {project.images.map(
                                            (img: any, index: number) => (
                                                <motion.div
                                                    key={img.id}
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            `/storage/${img.image_path}`,
                                                        )
                                                    } // Set image saat diklik
                                                    // Animasi masuk Staggered (satu per satu)
                                                    initial={{
                                                        opacity: 0,
                                                        y: 30,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.7,
                                                        delay: index * 0.1, // Jeda antar gambar
                                                        ease: [
                                                            0.215, 0.61, 0.355,
                                                            1,
                                                        ], // Power4.easeOut
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        amount: 0.3,
                                                    }} // Mulai animasi saat 30% gambar terlihat
                                                    className="group relative aspect-square cursor-pointer overflow-hidden bg-secondary/5"
                                                >
                                                    <img
                                                        // Pastikan kolom path gambar di database Anda sesuai (misal: image_path)
                                                        src={`/storage/${img.image_path}`}
                                                        alt={`${project.title} detail image ${index + 1}`}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />

                                                    {/* Overlay tipis saat hover agar lebih elegan */}
                                                    <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                                </motion.div>
                                            ),
                                        )}
                                    </div>
                                ) : (
                                    // Tampilan jika tidak ada gambar tambahan (Opsional)
                                    <div className="border border-dashed border-secondary/10 py-12 text-center">
                                        <p className="font-body text-sm text-secondary/40">
                                            No additional gallery images.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Footer with Variant (Bisa pakai 'secondary' agar kontras) */}
            <Footer variant="secondary" />

            {/* --- Lightbox / Modal --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)} // Tutup saat klik di mana saja (overlay)
                        className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-primary/95 p-4 md:p-10"
                    >
                        {/* Tombol Close */}
                        <button
                            className="absolute top-10 right-10 text-secondary transition-transform hover:scale-110"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.img
                            src={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{
                                type: 'spring',
                                damping: 25,
                                stiffness: 300,
                            }}
                            className="max-h-full max-w-full object-contain shadow-2xl"
                            alt="Enlarged view"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
