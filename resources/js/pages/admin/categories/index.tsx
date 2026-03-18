import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Plus, Search } from 'lucide-react'; // Menggunakan lucide-react untuk icon

interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

interface Props {
    categories: Category[];
}

const Index = ({ categories }: Props) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Logika filter sederhana untuk pencarian di sisi client
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <AppLayout>
            <Head title="Manage Categories" />

            <div className="p-6">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Daftar Kategori</h1>
                        <p className="text-sm text-gray-500">
                            Kelola kategori untuk project portfolio Anda.
                        </p>
                    </div>

                    {/* Tombol Add Category */}
                    <Link
                        href="admin.categories.create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Category
                    </Link>
                </div>

                {/* Barisan Search & Filter */}
                <div className="mb-6">
                    <div className="relative max-w-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari kategori..."
                            className="block w-full rounded-md border border-gray-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Nama
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredCategories.map((category) => (
                                <tr
                                    key={category.id}
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <Link
                                            href={`/admin/categories/${category.id}/edit`}
                                            className="mr-3 text-indigo-600 hover:text-indigo-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredCategories.length === 0 && (
                        <div className="py-12 text-center text-gray-500">
                            <p className="text-lg">Kategori tidak ditemukan.</p>
                            <p className="text-sm">
                                Coba kata kunci lain atau tambah kategori baru.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
