import { Head, Link } from '@inertiajs/react';
import { Briefcase, Code2, Folder } from 'lucide-react';

interface Props {
    categories: any[];
    experiences: any[];
    projects: any[];
}

export default function Welcome({ categories, experiences, projects }: Props) {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <Head title="Portfolio - Fullstack Developer" />

            {/* --- HERO SECTION --- */}
            <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
                <h1 className="text-6xl font-black tracking-tighter sm:text-8xl">
                    HALO, SAYA <span className="text-blue-600">NAMA ANDA.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-gray-600">
                    Seorang Fullstack Developer yang berbasis di Bali, spesialis
                    Laravel & React.
                </p>
            </section>

            {/* --- EXPERIENCE SECTION --- */}
            <section className="bg-gray-50 px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-12 flex items-center gap-3">
                        <Briefcase className="text-blue-600" />
                        <h2 className="text-3xl font-bold">Work Experience</h2>
                    </div>
                    <div className="space-y-8 border-l-2 border-gray-200 pl-8">
                        {experiences.map((exp) => (
                            <div key={exp.id} className="relative">
                                <div className="absolute top-1.5 -left-[41px] h-4 w-4 rounded-full border-4 border-white bg-blue-600" />
                                <span className="text-sm font-bold text-blue-600">
                                    {exp.start_date} -{' '}
                                    {exp.end_date ?? 'Present'}
                                </span>
                                <h3 className="text-xl font-bold">
                                    {exp.title}
                                </h3>
                                <p className="text-gray-500">{exp.company}</p>
                                <p className="mt-2 text-gray-600">
                                    {exp.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PROJECTS SECTION --- */}
            <section className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Folder className="text-blue-600" />
                            <h2 className="text-3xl font-bold">
                                Selected Projects
                            </h2>
                        </div>
                        {/* Filter Categories (Opsional) */}
                        <div className="hidden gap-2 md:flex">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className="rounded-full border px-4 py-1 text-xs font-medium transition-colors hover:bg-black hover:text-white"
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <Link
                                href={`/projects/${project.slug}`}
                                key={project.id}
                                className="group"
                            >
                                <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100 shadow-sm transition-all group-hover:shadow-xl">
                                    <img
                                        src={`/storage/${project.thumbnail}`}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        alt={project.title}
                                    />
                                </div>
                                <div className="mt-6">
                                    <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
                                        {project.category?.name}
                                    </span>
                                    <h3 className="text-2xl font-bold">
                                        {project.title}
                                    </h3>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tech_stack?.map(
                                            (tech: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="border-b border-gray-200 text-[10px] font-bold tracking-tighter text-gray-400 uppercase"
                                                >
                                                    {tech}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
