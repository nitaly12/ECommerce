'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Product {
    id: number;
    image: string;
    name: string;
    rating: number;
    price: number;
    description?: string;
}

interface DetailComponentProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default function DetailComponent({ product, isOpen, onClose }: DetailComponentProps) {
    const [selectedColor, setSelectedColor] = useState("White");
    const [selectedSize, setSelectedSize] = useState("M");

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity"
                    />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                            {/* Modal Panel */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-5xl"
                            >
                                <div className="absolute top-4 right-4 z-20">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-full bg-white/10 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 backdrop-blur-md transition-all"
                                    >
                                        <span className="sr-only">Close</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {/* Image Section */}
                                    <div className="relative h-64 sm:h-96 lg:h-auto overflow-hidden bg-gray-100 group">
                                        <Image
                                            src={`/assets/${product.image}`}
                                            alt={product.name}
                                            fill
                                            className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            priority
                                        />
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200">
                                                Best Seller
                                            </span>
                                        </div>
                                    </div>

                                    {/* Details Section */}
                                    <div className="flex flex-col p-6 sm:p-10 lg:p-12">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl font-display">
                                                    {product.name}
                                                </h2>
                                                <div className="mt-3 flex items-center gap-4">
                                                    <p className="text-2xl font-bold text-gray-900 tracking-tight">
                                                        ${product.price}
                                                    </p>
                                                    <div className="flex items-center gap-1 border-l border-gray-200 pl-4">
                                                        <div className="flex items-center text-yellow-400">
                                                            {[...Array(5)].map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    className={classNames(
                                                                        i < Math.round(product.rating)
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-200",
                                                                        "h-5 w-5 flex-shrink-0"
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-500 font-medium">
                                                            {product.rating} (117 Reviews)
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                                                    <ShareIcon className="h-6 w-6" />
                                                </button>
                                                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-red-500">
                                                    <HeartIcon className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-6">
                                            <p className="text-base text-gray-600 leading-relaxed">
                                                Experience premium comfort and style. This versatile piece is crafted from high-quality materials, perfect for any occasion. Designed to fit seamlessly into your modern lifestyle.
                                            </p>

                                            <form className="space-y-6">
                                                {/* Color Picker */}
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        {["White", "Gray", "Black"].map((color) => (
                                                            <label
                                                                key={color}
                                                                className={classNames(
                                                                    selectedColor === color
                                                                        ? "ring-2 ring-offset-2 ring-gray-900"
                                                                        : "ring-1 ring-black/5 hover:ring-black/10",
                                                                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none transition-all duration-200"
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="color-choice"
                                                                    value={color}
                                                                    className="sr-only"
                                                                    onChange={() => setSelectedColor(color)}
                                                                />
                                                                <span
                                                                    aria-hidden="true"
                                                                    className={classNames(
                                                                        color === "White" ? "bg-white" : color === "Gray" ? "bg-gray-200" : "bg-gray-900",
                                                                        "h-8 w-8 rounded-full border border-black/10 shadow-sm"
                                                                    )}
                                                                />
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Size Picker */}
                                                <div>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>
                                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 underline decoration-2 decoration-transparent hover:decoration-indigo-600 transition-all">
                                                            Size guide
                                                        </a>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
                                                        {["XXS", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                                                            <label
                                                                key={size}
                                                                className={classNames(
                                                                    selectedSize === size
                                                                        ? "bg-gray-900 text-white shadow-md ring-0"
                                                                        : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50",
                                                                    "group relative flex cursor-pointer items-center justify-center rounded-lg py-2 text-sm font-medium uppercase focus:outline-none sm:flex-1 transition-all duration-200"
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name="size-choice"
                                                                    value={size}
                                                                    className="sr-only"
                                                                    onChange={() => setSelectedSize(size)}
                                                                />
                                                                <span>{size}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <button
                                                        type="submit"
                                                        className="flex w-full items-center justify-center rounded-xl bg-gray-900 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-gray-900/10 hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                                                    >
                                                        Add to Bag
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
}

