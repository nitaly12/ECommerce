'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import DetailComponent from "./DetailComponent";
import CreateProductModal from "./CreateProductModal";
import { supabase } from "@/lib/supabase";
import { toast } from "react-toastify";
import {
    Squares2X2Icon,
    TableCellsIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PlusIcon
} from "@heroicons/react/24/outline";

interface Product {
    id: number;
    image: string;
    name: string;
    rating: number;
    price: number;
    status: string;
}

export default function ProductListComponent() {
    const [searchPro, setSearchPro] = useState("");
    const [sortPrice, setSortPrice] = useState("all");
    const [sortName, setSortName] = useState("all");
    const [sortRating, setSortRating] = useState("all");
    const [basket, setBasket] = useState<number[]>([])
    const router = useRouter()

    // Modal State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Realtime subscription
        const channel = supabase
            .channel('products_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'products' },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setProducts((prev) => [payload.new as Product, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
            if (error) {
                console.error('Error fetching products:', error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // Add status filter and pagination state
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const filterProduct = products
        .filter(product =>
            (statusFilter === 'all' || product.status === statusFilter) &&
            product.name.toLowerCase().includes(searchPro.toLowerCase())
        )
        .sort((a, b) => {
            if (sortName !== "all") {
                return sortName === "a-z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            if (sortPrice !== "all") {
                return sortPrice === "low-to-high" ? a.price - b.price : b.price - a.price;
            }
            if (sortRating !== "all") {
                return sortRating === "low-to-high" ? a.rating - b.rating : b.rating - a.rating;
            }
            return 0;
        });

    const totalPages = Math.ceil(filterProduct.length / itemsPerPage);
    const paginatedProducts = filterProduct.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleToggleBasket = (id: number) => {
        if (basket.includes(id)) {
            setBasket(basket.filter(item => item !== id))
        } else {
            setBasket([...basket, id])
        }
    }

    // Navigate to basket page and pass basket items as query params (comma-separated)
    const handleViewBasket = () => {
        const query = basket.join(',')
        router.push(`/dashboard/basket?items=${query}`)
    }
    return (
        <div className="pt-8 pb-16 flex flex-col min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2 font-display">Product Management</h1>
                    <p className="text-gray-500">Manage and organize your store inventory</p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:-translate-y-0.5 mt-4 md:mt-0"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Controls Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Filter Tabs */}
                    <div className="flex p-1 bg-gray-50 rounded-xl">
                        {['all', 'active', 'non-active'].map((status) => (
                            <button
                                key={status}
                                onClick={() => { setStatusFilter(status); setCurrentPage(1); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${statusFilter === status
                                    ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {status === 'all' ? 'All Products' : status.replace('-', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3 w-full md:w-auto">
                        {/* View Options */}
                        <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                            <button className="p-2 rounded-lg bg-white shadow-sm ring-1 ring-black/5 text-gray-900">
                                <Squares2X2Icon className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                                <TableCellsIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchPro}
                                onChange={(e) => { setSearchPro(e.target.value); setCurrentPage(1); }}
                                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5 transition-all text-sm"
                            />
                        </div>

                        <button className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                            <FunnelIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {paginatedProducts.map((product) => {
                        const inBasket = basket.includes(product.id)
                        return (
                            <div
                                key={product.id}
                                className={`group relative bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border ${inBasket ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'
                                    }`}
                            >
                                <div
                                    onClick={() => setSelectedProduct(product)}
                                    className="cursor-pointer overflow-hidden rounded-2xl bg-gray-100 aspect-square relative"
                                >
                                    <Image
                                        src={
                                            product.image
                                                ? product.image.startsWith("http")
                                                    ? product.image
                                                    : `/assets/${product.image}`
                                                : "/placeholder.png"
                                        }
                                        alt={product.name}
                                        fill
                                        sizes="100%"
                                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {inBasket && (
                                        <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-md bg-opacity-90">
                                            Added
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 px-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-xs font-medium text-gray-500 mb-1">Smart Watch</p>
                                            <h3
                                                onClick={() => setSelectedProduct(product)}
                                                className="text-base font-bold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
                                            >
                                                {product.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                    ? "text-yellow-400"
                                                    : "text-gray-200"
                                                    }`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                        <span className="text-xs font-semibold text-gray-500 ml-1">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                                        <span className="text-xl font-bold text-gray-900">${product.price}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleToggleBasket(product.id);
                                            }}
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${inBasket
                                                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg shadow-gray-900/10'
                                                }`}
                                        >
                                            {inBasket ? 'Remove' : 'Add to Bag'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <div className="relative w-48 h-48 mb-6">
                        <Image
                            src="/assets/no-product-found.svg"
                            alt="No product found" // Fallback if image missing
                            width={300}
                            height={300}
                            className="object-contain opacity-50"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500">
                        Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filterProduct.length)}</span> of <span className="font-semibold text-gray-900">{filterProduct.length}</span> results
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${currentPage === i + 1
                                        ? 'bg-gray-900 text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <DetailComponent
                product={selectedProduct}
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

            <CreateProductModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />
        </div>
    )
}
