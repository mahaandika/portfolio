import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ChevronRight } from 'lucide-react';

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
    experience: Experience;
}

const Edit = ({ experience }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        company: experience.company || '',
        position: experience.position || '',
        start_date: experience.start_date || '',
        end_date: experience.end_date || '',
        is_current: experience.is_current || false,
        description: experience.description || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/experiences/${experience.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Experience" />

            <div className="flex flex-col gap-4 p-4 sm:p-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link
                        href="/admin/experiences"
                        className="text-indigo-600 hover:text-black"
                    >
                        Experience
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium">Edit Experience</span>
                </nav>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-xl font-semibold text-gray-900">
                        Edit Experience Form
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Position
                                </label>
                                <input
                                    type="text"
                                    value={data.position}
                                    onChange={(e) =>
                                        setData('position', e.target.value)
                                    }
                                    className={`w-full rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black ${errors.position ? 'border-red-500' : ''}`}
                                />
                                {errors.position && (
                                    <span className="text-xs text-red-500">
                                        {errors.position}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    value={data.company}
                                    onChange={(e) =>
                                        setData('company', e.target.value)
                                    }
                                    className={`w-full rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black ${errors.company ? 'border-red-500' : ''}`}
                                />
                                {errors.company && (
                                    <span className="text-xs text-red-500">
                                        {errors.company}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Start Date
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-500 p-2.5 text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    End Date
                                </label>
                                <input
                                    type="date"
                                    value={data.is_current ? '' : data.end_date}
                                    disabled={data.is_current}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-500 p-2.5 text-sm disabled:bg-gray-50"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_current"
                                checked={data.is_current}
                                onChange={(e) =>
                                    setData('is_current', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <label
                                htmlFor="is_current"
                                className="text-sm text-gray-700"
                            >
                                I am currently working in this role
                            </label>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="w-full rounded-lg border border-gray-500 p-2.5 text-sm"
                            ></textarea>
                        </div>

                        <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                            <Link
                                href="/admin/experiences"
                                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing
                                    ? 'Updating...'
                                    : 'Update Experience'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
