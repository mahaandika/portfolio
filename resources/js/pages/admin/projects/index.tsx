import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Search,
    Plus,
    ExternalLink,
    Github,
    Image as ImageIcon,
    Trash2,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Project {
    id: number;
    title: string;
    category: Category;
    thumbnail: string;
    url_link: string | null;
    tech_stack: string[];
}

interface Props {
    projects: Project[];
}

const Index = ({ projects }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { delete: destroy, processing } = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    const filteredData = projects.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category?.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
    );

    const openDeleteModal = (project: Project) => {
        setSelectedProject(project);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedProject) {
            destroy(`/admin/projects/${selectedProject.id}`, {
                onSuccess: () => setShowDeleteModal(false),
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Projects" />

            <div className="flex flex-col gap-6 p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Projects Portfolio
                </h1>

                {/* Actions Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search project or category..."
                            className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-2 focus:ring-black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Link
                        href="/admin/projects/create"
                        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Project
                    </Link>
                </div>

                {/* Projects Table */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Project Info
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Tech Stack
                                    </th>
                                    <th className="px-6 py-4 text-right font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredData.map((project) => (
                                    <tr
                                        key={project.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100 bg-gray-100">
                                                    {project.thumbnail ? (
                                                        <img
                                                            src={`/storage/${project.thumbnail}`}
                                                            alt={project.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <ImageIcon className="h-full w-full p-3 text-gray-300" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">
                                                        {project.title}
                                                    </span>
                                                    <div className="mt-1 flex items-center gap-2">
                                                        {project.url_link && (
                                                            <ExternalLink className="h-3 w-3 text-gray-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                {project.category?.name ||
                                                    'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech_stack
                                                    ?.slice(0, 3)
                                                    .map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-500"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                {project.tech_stack?.length >
                                                    3 && (
                                                    <span className="text-[10px] text-gray-400">
                                                        +
                                                        {project.tech_stack
                                                            .length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="flex justify-end gap-2 px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/projects/${project.id}/edit`}
                                                className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    openDeleteModal(project)
                                                }
                                                className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Delete */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm animate-in rounded-xl bg-white p-6 shadow-xl duration-200 fade-in zoom-in">
                        <div className="mb-4 flex items-center gap-3 text-red-600">
                            <Trash2 className="h-6 w-6" />
                            <h3 className="text-lg font-bold">
                                Delete Project?
                            </h3>
                        </div>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-black">
                                "{selectedProject?.title}"
                            </span>
                            ? All gallery images will also be removed.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={processing}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {processing ? 'Deleting...' : 'Delete Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Index;
