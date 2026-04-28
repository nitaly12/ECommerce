'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
    MagnifyingGlassIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisHorizontalIcon,
    CheckBadgeIcon,
    ArrowTrendingUpIcon,
    GiftIcon
} from "@heroicons/react/24/outline";

export default function UserListComponent() {
    const [searchUser, setSearchUser] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const userPerPage = 6;

    type ApiUser = {
        id: number;
        username: string;
        firstName?: string | null;
        lastName?: string | null;
        phone?: string | null;
        email?: string | null;
        avatarUrl?: string | null;
        role?: string | null;
        enabled?: boolean | null;
    };

    interface UserRow {
        id: number;
        name: string;
        email: string;
        phone: string;
        role: string;
        enabled: boolean;
        avatarUrl: string | null;
    }

    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            try {
                const result = await api.get<ApiUser[] | ApiUser>("/user");
                const list = Array.isArray(result) ? result : [result];

                setUsers(
                    list.map((u) => ({
                        id: u.id,
                        name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.username,
                        email: u.email ?? "",
                        phone: u.phone ?? "",
                        role: u.role ?? "",
                        enabled: Boolean(u.enabled),
                        avatarUrl: u.avatarUrl ?? null,
                    }))
                );
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users");
            }
            setLoading(false);
        }
        fetchUsers();
    }, []);

    const filterUser = users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        user.email.toLowerCase().includes(searchUser.toLowerCase())
    );
    const indexOflastUser = currentPage * userPerPage;
    const indexOfFirstProduct = indexOflastUser - userPerPage;
    const currentUsers = filterUser.slice(indexOfFirstProduct, indexOflastUser);
    const totalPages = Math.ceil(filterUser.length / userPerPage)

    // Using a boolean for dropdown state if needed, or just standard HTML details/summary behavior
    // For now, keeping the static structure of the dropdown as in previous code, but styled better.
    // The previous code used data-dropdown-toggle which implies Flowbite JS. 
    // Since I don't know if Flowbite JS is active, I'll replace it with a simple React state or standard UI element.
    const [isActionOpen, setIsActionOpen] = useState(false);

    return (
        <div className="pt-10 pb-16 min-h-screen bg-gray-50/50 text-gray-900 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-display">User Management</h1>
                <p className="text-gray-500 mt-2">Manage user accounts and permissions</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
                {/* Header Controls */}
                <div className="p-4 border-b border-gray-100 bg-white flex flex-col sm:flex-row justify-between items-center gap-4 rounded-t-2xl">
                    <div className="relative">
                        <button
                            onClick={() => setIsActionOpen(!isActionOpen)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm"
                        >
                            <span>Bulk Actions</span>
                            <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>

                        {isActionOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsActionOpen(false)}></div>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden py-1 transform origin-top-left transition-all">
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <GiftIcon className="w-4 h-4 text-gray-400" /> Reward User
                                    </button>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <ArrowTrendingUpIcon className="w-4 h-4 text-gray-400" /> Promote
                                    </button>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <CheckBadgeIcon className="w-4 h-4 text-gray-400" /> Activate Account
                                    </button>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        Delete selected
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="relative w-full sm:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            value={searchUser}
                            onChange={(e) => { setSearchUser(e.target.value); setCurrentPage(1) }}
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border-none rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5 transition-all text-sm"
                            placeholder="Search users by name or email..."
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
                                <th scope="col" className="px-6 py-4 font-semibold">User</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Phone</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Role</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-500">
                                        Loading users...
                                    </td>
                                </tr>
                            ) : filterUser.length > 0 ? (
                                currentUsers.map((user) => (
                                    <tr key={user.id} className="bg-white border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input type="checkbox" className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900" />
                                            </div>
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                            <div className="relative w-10 h-10 flex-shrink-0">
                                                <Image
                                                    alt={user.name}
                                                    src={user.avatarUrl || "/assets/category-page-04-image-card-04.jpg"}
                                                    fill
                                                    className="rounded-full object-cover bg-gray-100"
                                                />
                                            </div>
                                            <div className="pl-3">
                                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500 font-normal">{user.email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 text-gray-600 font-medium">
                                            {user.phone}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 font-medium">{user.role || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.enabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                                {user.enabled ? "Active" : "Disabled"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-12">
                                        <div className="flex flex-col justify-center items-center">
                                            <div className="relative w-32 h-32 mb-4 opacity-50">
                                                <Image
                                                    src="/assets/no-product-found.png"
                                                    alt="No users found"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="text-gray-500">No users found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center p-4 border-t border-gray-100 bg-gray-50/30 rounded-b-2xl">
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
        </div >
    )
}