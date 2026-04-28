'use client';
import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "react-toastify";
import {
    XMarkIcon,
    PlusIcon,
    TagIcon,
    PhotoIcon,
    CurrencyDollarIcon,
    StarIcon
} from "@heroicons/react/24/outline";

interface CreateProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProductModal({ isOpen, onClose }: CreateProductModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        rating: "5",
        status: "active",
        image: "" // Start empty
    });
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showImagePicker, setShowImagePicker] = useState(false); // Added this state

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectImage = (imageName: string) => {
        setFormData({ ...formData, image: imageName });
        setPreviewUrl(`/assets/${imageName}`); // Assuming images are in /assets
        setShowImagePicker(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();
        setUploading(true);
        reader.onloadend = () => {
            const previewDataUrl = reader.result as string;
            setFormData({ ...formData, image: file.name });
            setPreviewUrl(previewDataUrl);
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.price || !formData.status) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/products', {
                name: formData.name,
                price: parseFloat(formData.price),
                rating: parseFloat(formData.rating),
                status: formData.status,
                image: formData.image,
            });
            toast.success("Product created successfully!");
            setFormData({
                name: "",
                price: "",
                rating: "5",
                status: "active",
                image: ""
            });
            setPreviewUrl(null);
            onClose();
        } catch (error) {
            console.error("Insert error:", error);
            toast.error("Failed to create product.");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex justify-center items-center backdrop-blur-sm bg-black/20">
            <div className="relative p-4 w-full max-w-lg">
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">
                                Add New Product
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">
                                Add a product to your main catalog
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form className="p-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm font-medium text-gray-700"
                                >
                                    Product Image
                                </label>

                                <div className="space-y-4">
                                    {/* File Upload & Gallery Option */}
                                    <div className="flex flex-col gap-3">
                                        <div className="relative">
                                            <input
                                                type="file"
                                                id="file-upload"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                disabled={uploading}
                                                className="hidden"
                                            />

                                            <label
                                                htmlFor="file-upload"
                                                className={`relative flex items-center justify-center w-full h-40 px-4 py-3 border-2 border-dashed rounded-xl cursor-pointer transition-all overflow-hidden
                                                ${uploading ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500 hover:bg-blue-50"}
                                                ${previewUrl || formData.image ? "border-gray-200 bg-gray-50" : "border-gray-300"}
                                                `}
                                            >
                                                {/* If uploading */}
                                                {uploading && (
                                                    <span className="flex items-center text-blue-600 z-10">
                                                        <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                        </svg>
                                                        Uploading...
                                                    </span>
                                                )}

                                                {/* If image exists */}
                                                {!uploading && (previewUrl || formData.image) && (
                                                    <>
                                                        <img
                                                            src={
                                                                previewUrl ||
                                                                (formData.image.startsWith("http")
                                                                    ? formData.image
                                                                    : `/assets/${formData.image}`)
                                                            }
                                                            alt="Preview"
                                                            className="absolute inset-0 w-full h-full object-contain"
                                                        />

                                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                                                            <span className="text-white text-sm font-medium">
                                                                Change Image
                                                            </span>
                                                        </div>
                                                    </>
                                                )}

                                                {/* Default State */}
                                                {!uploading && !previewUrl && !formData.image && (
                                                    <span className="flex items-center text-gray-600 font-medium">
                                                        <PhotoIcon className="w-5 h-5 mr-2 text-gray-400" />
                                                        Upload
                                                    </span>
                                                )}
                                            </label>

                                            {/* Remove Button */}
                                            {(previewUrl || formData.image) && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFormData({ ...formData, image: "" });
                                                        setPreviewUrl(null);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow hover:bg-red-50"
                                                >
                                                    <XMarkIcon className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Price & Rating Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <CurrencyDollarIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="399"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="rating"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Rating (0-5)
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <StarIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="rating"
                                            id="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="5"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Status & Image */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                                    >
                                        <option value="active">Active</option>
                                        <option value="non-active">Non-Active</option>
                                    </select>
                                </div>
                                {/* Product Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <TagIcon className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            placeholder="e.g. Apple Watch Series 7"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                ) : (
                                    <PlusIcon className="w-4 h-4" />
                                )}
                                {loading ? "Creating..." : "Add Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
