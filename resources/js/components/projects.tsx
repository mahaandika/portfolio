import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';

interface Project {
    id: number;
    title: string;
    description: string;
    category?: { name: string };
    thumbnail?: string; // Sesuaikan dengan field image kamu
    slug: string;
}

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section className="bg-secondary px-8 py-24 text-white md:px-16 lg:px-24">
            {/* --- Header --- */}
            <div className="mb-20 text-center">
                <span className="mb-4 block font-body text-sm tracking-widest text-gray-400 uppercase">
                    // Projects
                </span>
                <h2 className="mx-auto font-heading text-4xl leading-tight font-bold md:text-6xl lg:text-7xl">
                    FROM CONCEPT TO EXECUTION
                </h2>
            </div>

            {/* --- Project List --- */}
            <div className="flex flex-col gap-32 md:gap-48">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        isEven={index % 2 === 0}
                    />
                ))}
            </div>

            {/* --- Footer Button --- */}
            <div className="mt-24 text-center">
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
}: {
    project: Project;
    isEven: boolean;
}) {
    const ref = useRef(null);

    // Animasi Scroll
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // Efek Parallax & Scale
    const y = useSpring(
        useTransform(scrollYProgress, [0, 1], [100, -100]),
        springConfig,
    );
    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
        springConfig,
    );
    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.2, 0.9], [0.8, 1, 0.9]),
        springConfig,
    );

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale }}
            className={`flex flex-col items-center gap-10 md:flex-row md:gap-20 ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
        >
            {/* 1. Image Container */}
            <div className="w-full overflow-hidden rounded-lg bg-black/20 md:w-1/2">
                <motion.div style={{ y }} className="aspect-4/3 w-full">
                    <img
                        src={`/storage/${project.thumbnail}`}
                        alt={project.title}
                        className="h-full w-full object-cover transition-all duration-700"
                    />
                </motion.div>
            </div>

            {/* 2. Text Content */}
            <div className="flex w-full flex-col md:w-1/2">
                <h3 className="font-heading text-4xl font-bold md:text-5xl lg:text-6xl">
                    {project.title}
                </h3>
                <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-gray-400">
                    {project.description}
                </p>

                {/* Categories / Badges */}
                <div className="mt-8 flex flex-wrap gap-3">
                    {/* Kamu bisa meloop category jika datanya array, di sini contoh 1 category */}
                    <span className="rounded-full border border-white/20 px-4 py-1 font-mono text-xs tracking-widest text-white uppercase transition-colors hover:bg-white hover:text-black">
                        {project.category?.name || 'Development'}
                    </span>
                    <span className="rounded-full border border-white/20 px-4 py-1 font-mono text-xs tracking-widest text-white uppercase">
                        UI/UX
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
