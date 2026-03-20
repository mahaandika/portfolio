import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useState, useRef } from 'react';

interface Experience {
    id: number;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string;
}

interface ExpertiseProps {
    experiences: Experience[];
}

export default function Expertise({ experiences }: ExpertiseProps) {
    return (
        <section className="bg-primary px-8 py-20 text-black md:px-16 lg:px-24">
            <div className="border-b border-black/10 pb-8 md:mb-10">
                <span className="mb-4 block font-body text-sm tracking-widest text-gray-500 uppercase">
                    // Experience
                </span>
                <h2 className="font-heading text-4xl leading-tight font-bold md:text-7xl">
                    MY JOURNEY OF CREATION
                </h2>
            </div>

            <div className="flex flex-col">
                {experiences && experiences.length > 0 ? (
                    experiences.map((exp) => (
                        <ExperienceItem key={exp.id} data={exp} />
                    ))
                ) : (
                    <p className="py-10 font-mono text-gray-400 italic">
                        No experiences recorded yet.
                    </p>
                )}
            </div>
        </section>
    );
}

function ExperienceItem({ data }: { data: Experience }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Setup Scroll Progress untuk item spesifik ini
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'], // Mulai animasi saat bagian atas elemen menyentuh bawah layar
    });

    // 2. Buat Spring Config agar gerakan terasa "berat" dan halus
    const springConfig = { stiffness: 300, damping: 30, restDelta: 0.001 };

    // 3. Transformasi Scroll ke Nilai Animasi
    const opacityRaw = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0, 1, 1, 0],
    );
    const scaleRaw = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [0.9, 1, 1, 0.9],
    );
    const yRaw = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [50, 0, 0, -50],
    );

    // 4. Bungkus dengan Spring untuk efek kelembaman
    const opacity = useSpring(opacityRaw, springConfig);
    const scale = useSpring(scaleRaw, springConfig);
    const y = useSpring(yRaw, springConfig);

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale, y }} // Terapkan animasi scroll spring
            initial="initial"
            animate={isOpen ? 'hover' : 'initial'}
            whileHover="hover"
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex cursor-pointer flex-col border-b border-black/10 py-12 transition-colors hover:bg-black/[0.01] md:flex-row md:items-start"
        >
            <div className="mb-4 w-full md:mb-0 md:w-1/4">
                <p className="font-mono text-sm tracking-tighter text-gray-400 uppercase md:text-base">
                    {formatDate(data.start_date)} —{' '}
                    {data.is_current ? 'Present' : formatDate(data.end_date)}
                </p>
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex items-baseline gap-4">
                    <h3 className="font-heading text-3xl font-medium uppercase md:text-5xl lg:text-5xl">
                        {data.position}
                    </h3>
                </div>
                <p className="mt-2 font-body text-xl text-gray-500 md:text-2xl">
                    at <span className="text-black italic">{data.company}</span>
                </p>

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

            <div className="relative ml-10 hidden md:flex">
                <motion.div
                    variants={{
                        initial: {
                            rotate: 0,
                            scale: 1,
                            backgroundColor: 'rgba(0,0,0,0)',
                            color: '#000',
                        },
                        hover: {
                            rotate: -45,
                            scale: 1.1,
                            backgroundColor: '#000',
                            color: '#fff',
                        },
                    }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10"
                >
                    <span className="text-2xl">→</span>
                </motion.div>
            </div>
        </motion.div>
    );
}
