import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ChevronRight } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    status: 'active' | 'inactive';
}

interface Props {
    category: Category;
}

const Edit = ({ category }: Props) => {
    // Menginisialisasi form dengan data lama (category) dari database
    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        status: category.status || 'active',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mengirim data ke URL edit spesifik dengan method PUT
        put(`/admin/categories/${category.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Category" />

            <div className="flex flex-col gap-4 p-4 sm:p-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/admin/categories" className="hover:text-black">
                        Category
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-medium text-indigo-600">
                        Edit Category
                    </span>
                </nav>

                {/* Card Form */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-xl font-semibold text-gray-900">
                        Edit Category Form
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Input Category Name */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="Input category name..."
                                    className={`w-full rounded-lg border p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                                        errors.name
                                            ? 'border-red-500'
                                            : 'border-gray-500'
                                    }`}
                                />
                                {errors.name && (
                                    <span className="text-xs text-red-500">
                                        {errors.name}
                                    </span>
                                )}
                            </div>

                            {/* Input Status */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="status"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData('status', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-500 p-2.5 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-4">
                            <Link
                                href="/admin/categories"
                                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
