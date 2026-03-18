import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ChevronRight, Upload, X } from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

const Create = ({ categories }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        title: '',
        description: '',
        thumbnail: null as File | null,
        url_link: '',
        github_link: '',
        tech_stack: [] as string[],
        images: [] as File[], // Untuk gallery
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/projects', {
            forceFormData: true, // WAJIB ada agar array file terkirim dengan benar
            onSuccess: () => alert('Berhasil!'),
            onError: (err) => console.log(err),
        });
    };

    // Helper untuk mengelola tech stack dari string ke array
    const handleTechStackChange = (value: string) => {
        const tags = value.split(',').map((tag) => tag.trim());
        setData('tech_stack', tags);
    };

    return (
        <AppLayout>
            <Head title="Create Project" />

            <div className="flex flex-col gap-4 p-4 sm:p-6">
                <nav className="flex items-center gap-2 text-sm text-gray-500">
                    <Link href="/admin/projects" className="text-indigo-600">
                        Projects
                    </Link>
                    <ChevronRight className="h-4 w-4" />
                    <span>Create Project</span>
                </nav>

                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                                    placeholder="e.g. E-Commerce Web"
                                />
                                {errors.title && (
                                    <span className="text-xs text-red-500">
                                        {errors.title}
                                    </span>
                                )}
                            </div>

                            {/* Category */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select
                                    onChange={(e) =>
                                        setData('category_id', e.target.value)
                                    }
                                    className="rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <span className="text-xs text-red-500">
                                        {errors.category_id}
                                    </span>
                                )}
                            </div>

                            {/* Tech Stack */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Tech Stack (Separate by comma)
                                </label>
                                <input
                                    type="text"
                                    placeholder="React, Laravel, Tailwind..."
                                    onChange={(e) =>
                                        handleTechStackChange(e.target.value)
                                    }
                                    className="rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Links */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Live URL
                                </label>
                                <input
                                    type="url"
                                    onChange={(e) =>
                                        setData('url_link', e.target.value)
                                    }
                                    className="rounded-lg border border-gray-500 p-2.5 text-sm"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows={4}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                className="rounded-lg border border-gray-500 p-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
                            ></textarea>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                Thumbnail Image
                            </label>

                            <div className="flex flex-col items-start gap-4">
                                {/* Preview Thumbnail */}
                                {data.thumbnail && (
                                    <div className="group relative h-40 w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                        <img
                                            src={URL.createObjectURL(
                                                data.thumbnail,
                                            )}
                                            alt="Thumbnail preview"
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData('thumbnail', null)
                                            }
                                            className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )}

                                {/* Input File */}
                                {!data.thumbnail && (
                                    <div className="relative flex w-full max-w-sm items-center justify-center">
                                        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="mb-2 h-8 w-8 text-gray-400" />
                                                <p className="text-xs text-gray-500">
                                                    Click to upload thumbnail
                                                </p>
                                                <p className="mt-1 px-4 text-center text-[10px] text-gray-400">
                                                    PNG, JPG or JPEG (Max. 2MB)
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden" // Sembunyikan input asli untuk tampilan yang lebih clean
                                                onChange={(e) =>
                                                    setData(
                                                        'thumbnail',
                                                        e.target.files
                                                            ? e.target.files[0]
                                                            : null,
                                                    )
                                                }
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {errors.thumbnail && (
                                <span className="text-xs text-red-500">
                                    {errors.thumbnail}
                                </span>
                            )}
                        </div>

                        {/* Gallery Images Upload (Multiple) */}
                        {/* Gallery Images Upload (Multiple) */}
                        <div className="flex flex-col gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4">
                            <label className="text-sm font-semibold text-gray-700">
                                Project Gallery (Multiple Images)
                            </label>
                            <p className="mb-2 text-xs text-gray-500">
                                You can select more than one image. Select again
                                to add more.
                            </p>

                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    const newFiles = e.target.files
                                        ? Array.from(e.target.files)
                                        : [];
                                    // MERGE: Gabungkan file lama dengan file yang baru dipilih
                                    setData('images', [
                                        ...data.images,
                                        ...newFiles,
                                    ]);
                                }}
                                className="cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-300"
                            />

                            {/* Preview & Remove Button */}
                            {data.images.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                                    {data.images.map((file, i) => (
                                        <div
                                            key={i}
                                            className="group relative aspect-video overflow-hidden rounded-lg border bg-white"
                                        >
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="preview"
                                                className="h-full w-full object-cover"
                                            />
                                            {/* Tombol Hapus untuk membatalkan file tertentu sebelum diupload */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedFiles =
                                                        data.images.filter(
                                                            (_, index) =>
                                                                index !== i,
                                                        );
                                                    setData(
                                                        'images',
                                                        updatedFiles,
                                                    );
                                                }}
                                                className="absolute top-1 right-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                            <div className="absolute inset-x-0 bottom-0 truncate bg-black/50 px-2 py-1 text-[10px] text-white">
                                                {file.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {errors.images && (
                                <span className="text-xs text-red-500">
                                    {errors.images}
                                </span>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                            <Link
                                href="/admin/projects"
                                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                            >
                                {processing ? 'Uploading...' : 'Save Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
