import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    description: string;
    category?: { name: string };
    thumbnail?: string;
    slug: string;
    tech_stack: string[] | null;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section className="bg-secondary text-white">
            {/* --- Header --- */}
            <div className="px-8 py-14 text-center md:px-16 lg:px-24 lg:py-24">
                <span className="mb-4 block font-body text-sm tracking-widest text-gray-400 uppercase">
                    // Projects
                </span>
                <h2 className="mx-auto font-heading text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                    FROM CONCEPT TO EXECUTION
                </h2>
            </div>

            {/* --- Project List with Sticky Effect --- */}
            <div className="flex flex-col">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        isEven={index % 2 === 0}
                        index={index}
                    />
                ))}
            </div>

            {/* --- Footer Button --- */}
            <div className="relative z-30 bg-secondary py-14 text-center">
                <Link
                    href="/projects"
                    className="inline-block rounded-full bg-white px-10 py-4 font-heading text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
                >
                    BROWSE ALL WORK
                </Link>
            </div>
        </section>
    );
}

function ProjectItem({
    project,
    isEven,
    index,
}: {
    project: Project;
    isEven: boolean;
    index: number;
}) {
    const containerRef = useRef(null);

    // Setup Scroll untuk efek Scaling pada item di bawahnya
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    // Efek scale down sedikit saat item mulai tertutup item di bawahnya
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

    return (
        <div
            ref={containerRef}
            className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden border-t border-b border-white/10 bg-secondary"
            style={{ zIndex: index + 1 }} // Agar item selanjutnya menumpuk di atas
        >
            <motion.div
                style={{ scale }}
                className={`flex h-full w-full flex-col items-center justify-center gap-10 px-8 md:flex-row md:gap-20 md:px-16 lg:px-24 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
            >
                {/* 1. Image Container */}
                <div className="w-full overflow-hidden rounded-2xl bg-black/20 md:w-1/2">
                    <div className="aspect-4/3 w-full overflow-hidden">
                        <img
                            src={`/storage/${project.thumbnail}`}
                            alt={project.title}
                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                    </div>
                </div>

                {/* 2. Text Content */}
                <div className="flex w-full flex-col md:w-1/2">
                    <h3 className="font-heading text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                        {project.title}
                    </h3>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <span className="rounded-full border border-white/20 px-4 py-1 font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                            // {project.category?.name || 'Development'}
                        </span>

                        <div className="flex flex-wrap gap-3">
                            {Array.isArray(project.tech_stack) ? (
                                project.tech_stack.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="rounded-full border border-white/20 px-4 py-1 font-mono text-[10px] tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-black"
                                    >
                                        {tech}
                                    </span>
                                ))
                            ) : (
                                <span className="rounded-full border border-white/20 px-4 py-1 font-mono text-[10px] tracking-widest text-white uppercase">
                                    {project.tech_stack}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="w-full max-w-xl">
                        <p className="mt-6 line-clamp-4 text-left font-body text-lg leading-relaxed text-gray-400">
                            {project.description}
                        </p>

                        {/* See Detail & Garis Berdampingan (Hanya Bagian Ini Yang Berubah Posisi) */}
                        <div
                            className={`mt-10 flex items-center gap-6 ${isEven ? 'flex-row' : 'md:flex-row-reverse'}`}
                        >
                            <Link
                                href={`/projects/${project.id}`}
                                className="group/link flex shrink-0 items-center gap-3 font-heading text-xs font-bold tracking-[0.4em] text-white uppercase transition-colors"
                            >
                                See Detail
                                {/* Animasi Arrow Putih */}
                                <motion.span
                                    initial={{ x: -5, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    className="inline-block"
                                >
                                    <svg
                                        width="24"
                                        height="12"
                                        viewBox="0 0 24 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="transition-transform duration-500 group-hover/link:translate-x-2"
                                    >
                                        <path
                                            d="M1 6H23M23 6L18 1M23 6L18 11"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-colors"
                                        />
                                    </svg>
                                </motion.span>
                            </Link>

                            {/* Garis Horizontal */}
                            <div className="relative h-px grow overflow-hidden bg-white/20">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{
                                        duration: 1.5,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    style={{ originX: isEven ? 0 : 1 }}
                                    className="absolute inset-0 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
