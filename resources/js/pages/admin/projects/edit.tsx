import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    ArrowLeft,
    Upload,
    X,
    Plus,
    Save,
    Image as ImageIcon,
    Trash2,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
}

interface ProjectImage {
    id: number;
    image_path: string;
}

interface Project {
    id: number;
    category_id: number;
    title: string;
    description: string;
    thumbnail: string;
    url_link: string | null;
    github_link: string | null;
    tech_stack: string[];
    images: ProjectImage[];
}

interface Props {
    project: Project;
    categories: Category[];
}

const Edit = ({ project, categories }: Props) => {
    // 1. Inisialisasi Form
    const { data, setData, post, processing, errors } = useForm({
        category_id: project.category_id,
        title: project.title,
        description: project.description,
        tech_stack: project.tech_stack || [],
        url_link: project.url_link || '',
        github_link: project.github_link || '',
        thumbnail: null as File | null,
        new_images: [] as File[],
        _method: 'put', // Spoofing Method untuk Laravel
    });

    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    const handleNewImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files);

            // 1. Tambahkan ke data Inertia (agar terkirim ke backend)
            // Kita gunakan spread operator agar file lama tidak hilang saat pilih file lagi
            setData('new_images', [...data.new_images, ...fileArray]);

            // 2. Buat Preview URL untuk ditampilkan di UI
            const newUrls = fileArray.map((file) => URL.createObjectURL(file));
            setNewPreviews([...newPreviews, ...newUrls]);
        }
    };

    const removeSelectedNewImage = (index: number) => {
        // Hapus dari data yang akan dikirim
        const updatedFiles = data.new_images.filter((_, i) => i !== index);
        setData('new_images', updatedFiles);

        // Hapus dari preview
        const updatedPreviews = newPreviews.filter((_, i) => i !== index);
        setNewPreviews(updatedPreviews);
    };

    const [tempThumbnail, setTempThumbnail] = useState<string | null>(null);

    // 2. Handler Hapus Foto Gallery Lama (Satu per satu)
    const deleteOldImage = (imageId: number) => {
        if (confirm('Hapus foto ini dari galeri permanen?')) {
            // Pastikan path-nya adalah /admin/project-images/ (jamak/plural sesuai route)
            router.delete(`/admin/project-images/${imageId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    // Opsional: tambahkan notifikasi sukses di sini
                },
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Gunakan POST karena membawa File, tapi Laravel akan membacanya sebagai PUT
        post(`/admin/projects/${project.id}`, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout>
            <Head title={`Edit Project - ${project.title}`} />

            <div className="mx-auto max-w-5xl p-4 sm:p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/projects"
                            className="rounded-full p-2 transition-colors hover:bg-gray-100"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Edit Project
                            </h1>
                            <p className="text-sm text-pretty text-gray-500">
                                Update your project details and gallery.
                            </p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-8 lg:grid-cols-3"
                >
                    {/* Kolom Kiri: Form Detail */}
                    <div className="space-y-6 lg:col-span-2">
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Project Title
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <select
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                'category_id',
                                                parseInt(e.target.value),
                                            )
                                        }
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-gray-900">
                                Project Gallery
                            </h3>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {/* A. GAMBAR LAMA (Sudah ada di Server) */}
                                {project.images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="group relative aspect-square overflow-hidden rounded-lg border"
                                    >
                                        <img
                                            src={`/storage/${img.image_path}`}
                                            className="h-full w-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteOldImage(img.id)
                                            }
                                            className="absolute inset-0 flex items-center justify-center bg-red-600/20 opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <div className="rounded-full bg-red-600 p-2 text-white shadow-lg">
                                                <Trash2 className="h-4 w-4" />
                                            </div>
                                        </button>
                                    </div>
                                ))}

                                {/* B. PREVIEW GAMBAR BARU (Belum di-upload) */}
                                {newPreviews.map((url, index) => (
                                    <div
                                        key={index}
                                        className="group relative aspect-square overflow-hidden rounded-lg border border-blue-200 ring-2 ring-blue-50"
                                    >
                                        <img
                                            src={url}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute top-1 left-1 rounded bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold text-white uppercase">
                                            New
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeSelectedNewImage(index)
                                            }
                                            className="absolute top-1 right-1 rounded-full bg-gray-900/50 p-1 text-white hover:bg-red-600"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}

                                {/* C. TOMBOL TAMBAH (Input) */}
                                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 transition-colors hover:bg-gray-50">
                                    <Plus className="h-6 w-6 text-gray-400" />
                                    <span className="mt-1 text-xs text-gray-500">
                                        Add More
                                    </span>
                                    <input
                                        type="file"
                                        multiple
                                        className="hidden"
                                        onChange={handleNewImagesChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Media & Actions */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-gray-900">
                                Main Thumbnail
                            </h3>
                            <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                                {tempThumbnail || project.thumbnail ? (
                                    <img
                                        src={
                                            tempThumbnail ||
                                            `/storage/${project.thumbnail}`
                                        }
                                        className="h-full w-full object-cover"
                                        alt="Thumbnail"
                                    />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center text-gray-400">
                                        <ImageIcon className="h-8 w-8" />
                                    </div>
                                )}
                            </div>
                            <label className="mt-4 block cursor-pointer rounded-lg border border-black py-2 text-center text-sm font-medium transition-colors hover:bg-black hover:text-white">
                                Change Thumbnail
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('thumbnail', file);
                                            setTempThumbnail(
                                                URL.createObjectURL(file),
                                            );
                                        }
                                    }}
                                />
                            </label>
                            {errors.thumbnail && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.thumbnail}
                                </p>
                            )}
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <h3 className="mb-4 font-bold text-gray-900">
                                Actions
                            </h3>
                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                                >
                                    <Save className="h-4 w-4" />
                                    {processing
                                        ? 'Saving Changes...'
                                        : 'Save Changes'}
                                </button>
                                <Link
                                    href="/admin/projects"
                                    className="block w-full rounded-lg border border-gray-200 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
