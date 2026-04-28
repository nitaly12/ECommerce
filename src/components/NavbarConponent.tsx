'use client'
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CreateProductAction from "@/app/action/CreateProductAction";
import { api } from "@/lib/api";
import { useTranslation } from "react-i18next";
export default function NavbarComponent() {
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMobileMenuOpen(false); // Step 3: close if click outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);
    const menu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: { target: any; }) {
            if (menu.current && !menu.current.contains(event.target)) {
                setMenuOpen(false); // Step 3: close if click outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const fetchStockItems = async () => {
        const data = await api.get<any[]>('/api/stock-items');
    };
    useEffect(() => {
        fetchStockItems();
    }, []);
    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">{t("navbar.openSidebar")}</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <CreateProductAction onProductCreated={fetchStockItems} />
                            <div ref={menuRef} className="relative flex items-center ms-3">
                                {/* Toggle Button */}
                                <button
                                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                                    type="button"
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    aria-expanded={mobileMenuOpen}
                                >
                                    <span className="sr-only">{t("navbar.openUserMenu")}</span>
                                    <Image
                                        className="w-8 h-8 rounded-full"
                                        src="/assets/category-page-04-image-card-04.jpg"
                                        alt="user photo"
                                        width={32}
                                        height={32}
                                    />
                                </button>

                                {/* Dropdown Menu */}
                                {mobileMenuOpen && (
                                    <div className="absolute top-12 right-0 z-50 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm">
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm text-gray-900 dark:text-black">Neil Sims</p>
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                                                neil.sims@flowbite.com
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    {t("navbar.dashboard")}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    {t("navbar.settings")}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    {t("navbar.earnings")}
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-red-500 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    {t("navbar.signOut")}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}