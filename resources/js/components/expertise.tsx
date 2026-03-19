import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Simulasi data dari Database/Model Laravel
const experiences = [
    {
        id: 1,
        company: 'Taka Creative',
        position: 'Full-stack Developer',
        start_date: '2025-01',
        end_date: null,
        is_current: true,
        description:
            'Developing professional web solutions and managing branding projects for Bali-based clients.',
    },
    {
        id: 2,
        company: 'International School',
        position: 'ICT Teacher',
        start_date: '2024-07',
        end_date: '2025-01',
        is_current: false,
        description:
            'Providing English-instruction for grades 6-9, focusing on algorithms and pseudocode.',
    },
];

export default function ExperienceSection() {
    return (
        <section className="bg-primary px-8 py-20 text-black md:px-16 lg:px-24">
            {/* --- Header --- */}
            <div className="border-b border-black/10 pb-8 md:mb-10">
                <span className="mb-4 block font-body text-sm tracking-widest text-gray-500 uppercase">
                    // Experience
                </span>
                <h2 className="font-heading text-5xl leading-tight font-bold md:text-7xl">
                    MY JOURNEY OF CREATION
                </h2>
            </div>

            {/* --- List Experience --- */}
            <div className="flex flex-col">
                {experiences.map((exp) => (
                    <ExperienceItem key={exp.id} data={exp} />
                ))}
            </div>
        </section>
    );
}

function ExperienceItem({ data }: { data: (typeof experiences)[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial="initial"
            animate={isOpen ? 'hover' : 'initial'}
            whileHover="hover"
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex cursor-pointer flex-col border-b border-black/10 py-12 transition-colors hover:bg-black/[0.01] md:flex-row md:items-start"
        >
            {/* 1. Kolom Waktu */}
            <div className="mb-4 w-full md:mb-0 md:w-1/4">
                <p className="font-mono text-sm tracking-tighter text-gray-400 uppercase md:text-base">
                    {data.start_date} —{' '}
                    {data.is_current ? 'Present' : data.end_date}
                </p>
            </div>

            {/* 2. Kolom Utama */}
            <div className="flex flex-1 flex-col">
                <div className="flex items-baseline gap-4">
                    <h3 className="font-heading text-3xl font-medium md:text-5xl lg:text-6xl">
                        {data.position}
                    </h3>
                </div>
                <p className="mt-2 font-body text-xl text-gray-500 md:text-2xl">
                    at <span className="text-black italic">{data.company}</span>
                </p>

                {/* 3. Deskripsi */}
                <motion.div
                    variants={{
                        initial: { height: 0, opacity: 0, marginTop: 0 },
                        hover: { height: 'auto', opacity: 1, marginTop: 24 },
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden"
                >
                    <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                        {data.description}
                    </p>
                </motion.div>
            </div>

            {/* 4. Arrow Indicator - SEKARANG TERSEMBUNYI DI MOBILE */}
            <div className="relative ml-10 hidden md:flex">
                <motion.div
                    variants={{
                        initial: {
                            rotate: 0,
                            scale: 1,
                            backgroundColor: 'rgba(0,0,0,0)', // Gunakan rgba transparan
                            color: '#000',
                        },
                        hover: {
                            rotate: -45,
                            scale: 1.1,
                            backgroundColor: '#000',
                            color: '#fff',
                        },
                    }}
                    // Hapus 'transition-colors' agar tidak bentrok dengan Framer Motion
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10"
                >
                    <span className="text-2xl">→</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
