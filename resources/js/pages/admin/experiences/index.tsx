import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Search,
    Plus,
    Briefcase,
    Calendar,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

interface Experience {
    id: number;
    company: string;
    position: string;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
}

interface Props {
    experiences: Experience[];
}

const Index = ({ experiences }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { delete: destroy, processing } = useForm();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

    // Fungsi format tanggal (Misal: Jan 2023)
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        });
    };

    const filteredData = experiences.filter(
        (item) =>
            item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.position.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const openDeleteModal = (exp: Experience) => {
        setSelectedExp(exp);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedExp) {
            destroy(`/admin/experiences/${selectedExp.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedExp(null);
                },
                preserveScroll: true, // Agar posisi scroll tidak lompat saat menghapus
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Experience" />

            <div className="flex flex-col gap-6 p-4 sm:p-6">
                <h1 className="text-2xl font-bold text-gray-900">Experience</h1>

                {/* Header Actions */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search position or company..."
                            className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm transition-all outline-none focus:ring-2 focus:ring-black"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Link
                        href="/admin/experiences/create"
                        className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
                    >
                        <Plus className="h-4 w-4" />
                        Add Experience
                    </Link>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="border-b border-gray-100 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Position & Company
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Duration
                                    </th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-right font-semibold text-gray-700">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredData.map((exp) => (
                                    <tr
                                        key={exp.id}
                                        className="transition-colors hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900">
                                                    {exp.position}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {exp.company}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                                <span>
                                                    {formatDate(exp.start_date)}{' '}
                                                    -{' '}
                                                    {exp.is_current
                                                        ? 'Present'
                                                        : formatDate(
                                                              exp.end_date,
                                                          )}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {exp.is_current ? (
                                                <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                                                    Current Job
                                                </span>
                                            ) : (
                                                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                    Past
                                                </span>
                                            )}
                                        </td>
                                        <td className="flex justify-end gap-2 px-6 py-4 text-right">
                                            <Link
                                                href={`/admin/experiences/${exp.id}/edit`}
                                                className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-50"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    openDeleteModal(exp)
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

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-sm animate-in rounded-xl bg-white p-6 shadow-xl duration-200 fade-in zoom-in">
                        <h3 className="text-lg font-bold text-gray-900">
                            Confirm Delete
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete experience at{' '}
                            <span className="font-semibold text-black">
                                "{selectedExp?.company}"
                            </span>
                            ?
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
                                {processing ? 'Deleting...' : 'Delete Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default Index;
