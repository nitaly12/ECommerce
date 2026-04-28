'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProductAction from "@/app/action/UpdateProductAction";
import { useState, useEffect } from "react"
import Image from 'next/image';
import { api } from "@/lib/api";
import {
    MagnifyingGlassIcon,
    TrashIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function StockListComponent() {
    const [searchItem, setSearchItem] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 9;

    interface StockItem {
        id: number;
        name: string;
        color: string;
        category: string;
        price: number;
    }

    const [products, setProduct] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchStockItems = async () => {
        setLoading(true);
        try {
            const data = await api.get<StockItem[]>('/api/stock-items');
            setProduct(data || []);
        } catch (error) {
            console.error('Error fetching stock items:', error);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchStockItems();
    }, []);
    //delete product
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/api/stock-items/${id}`);
            setProduct(prevUsers => prevUsers.filter(pro => pro.id !== id));
            toast.success("Product deleted successfully!");
        } catch (error) {
            toast.error('Failed to delete item');
            console.error('Delete error:', error);
        }
    };

    const filterItems = products.filter(pro =>
        pro.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    //pagination logic
    const indexOflastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOflastProduct - productPerPage;
    const currentProducts = filterItems.slice(indexOfFirstProduct, indexOflastProduct);

    const totalPages = Math.ceil(filterItems.length / productPerPage);

    return (
        <div className="pt-10 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">Stock Management</h1>
                <p className="text-gray-500 mt-2">View and manage your current stock inventory</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Actions */}
                <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5 transition-all text-sm"
                            placeholder="Search items..."
                            value={searchItem}
                            onChange={(e) => { setSearchItem(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th scope="col" className="p-4 w-4">
                                    <div className="flex items-center">
                                        <input type="checkbox" className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900" />
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold">Product Name</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Color</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Action</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterItems.length > 0 ? (
                                currentProducts.map((pro) => (
                                    <tr key={pro.id} className="bg-white border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input type="checkbox" className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900" />
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {pro.name}
                                        </th>
                                        <td className="px-6 py-4">{pro.color}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {pro.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">${pro.price}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <UpdateProductAction
                                                    product={pro}
                                                    onUpdated={fetchStockItems}
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(pro.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-lg hover:bg-red-50"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="text-center py-12">
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="relative w-32 h-32 mb-4 opacity-50">
                                                <Image
                                                    src="/assets/no-product-found.svg"
                                                    alt="No items found"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="text-gray-500">No stock items found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50/30">
                        <span className="text-sm text-gray-500">
                            Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                                <ChevronRightIcon className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    )
}