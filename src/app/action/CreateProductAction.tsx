'use client';
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import {
    XMarkIcon,
    PlusIcon,
    TagIcon,
    SwatchIcon,
    FolderIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

interface CreateProductActionProps {
    onProductCreated?: () => void;
}

export default function CreateProductAction({ onProductCreated }: CreateProductActionProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        color: "#3b82f6",
        category: "",
        price: "",
    });

    useEffect(() => {
        function handleClickOutside(event: { target: any }) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.category || !formData.price) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.from("stock_items").insert({
            name: formData.name,
            color: formData.color,
            category: formData.category,
            price: parseFloat(formData.price),
        });

        if (error) {
            console.error("Insert error:", error);
            toast.error("Failed to create product.");
        } else {
            toast.success("Product created successfully!");
            setFormData({ name: "", color: "#3b82f6", category: "", price: "" });
            setMenuOpen(false);
            onProductCreated?.();
        }
        setLoading(false);
    };

    return (
        <div ref={menuRef}>
            {/* Toggle Button */}
            <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5"
                type="button"
            >
                <PlusIcon className="w-5 h-5" />
                New Product
            </button>

            {/* Modal */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/20">
                    <div className="relative p-4 w-full max-w-lg">
                        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Create New Product
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Add a new item to your stock inventory
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(false)}
                                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form className="p-6" onSubmit={handleSubmit}>
                                <div className="space-y-5">
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
                                                placeholder="e.g. Apple MacBook Pro"
                                            />
                                        </div>
                                    </div>

                                    {/* Color & Category Row */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="color"
                                                className="block mb-2 text-sm font-medium text-gray-700"
                                            >
                                                Color
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <SwatchIcon className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="color"
                                                    id="color"
                                                    value={formData.color}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                                    placeholder="e.g. Silver"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="category"
                                                className="block mb-2 text-sm font-medium text-gray-700"
                                            >
                                                Category <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                    <FolderIcon className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <select
                                                    id="category"
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="block w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Laptop">Laptop</option>
                                                    <option value="Accessories">Accessories</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="PC Desktop">PC Desktop</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
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
                                                placeholder="2999"
                                                min="0"
                                                step="0.01"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setMenuOpen(false)}
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
            )}
        </div>
    );
}