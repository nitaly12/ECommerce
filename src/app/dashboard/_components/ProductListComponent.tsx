'use client'
import Image from "next/image"
import { userAgent } from "next/server";
import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ProductListComponent() {
    const [searchPro, setSearchPro] = useState("");
    const [sortPrice, setSortPrice] = useState("all");
    const [sortName, setSortName] = useState("all");
    const [sortRating, setSortRating] = useState("all");
    const [basket, setBasket] = useState<number[]>([])
    const router = useRouter()
    const products = [
        { id: 1, image: 'mega-menu-category-01.jpg', name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport', rating: 4.5, Price: '$399', status: 'active' },
        { id: 2, image: 'mega-menu-category-02.jpg', name: 'Smart Watch, Aluminium Case, Starlight Sport', rating: 2.5, Price: '$999', status: 'active' },
        { id: 3, image: 'product-page-01-related-product-01.jpg', name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport', rating: 3.0, Price: '$599', status: 'active' },
        { id: 4, image: 'apple-watch.png', name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport', rating: 5.0, Price: '$899', status: 'active' },
        { id: 5, image: 'product-page-01-related-product-02.jpg', name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport', rating: 4.0, Price: '$299', status: 'non-active' },
        { id: 6, image: 'product-page-01-related-product-03.jpg', name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport', rating: 5.0, Price: '$599', status: 'active' },
    ]
    const parsePrice = (price: string) => Number(price.replace("$", ""))
    
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
                return sortPrice === "low-to-high" ? parsePrice(a.Price) - parsePrice(b.Price) : parsePrice(b.Price) - parsePrice(a.Price);
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
        <div className="pt-10 flex flex-col min-h-screen bg-[#f8f9fa] text-gray-900 px-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Management Product</h1>
                    <p className="text-gray-500 text-sm">Add Product to your store</p>
                </div>
                <button className="bg-black text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-800 mt-4 md:mt-0">Add Product</button>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
                <button 
                    onClick={() => { setStatusFilter('all'); setCurrentPage(1); }} 
                    className={`px-4 py-2 rounded ${statusFilter === 'all' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => { setStatusFilter('active'); setCurrentPage(1); }} 
                    className={`px-4 py-2 rounded ${statusFilter === 'active' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Active
                </button>
                <button 
                    onClick={() => { setStatusFilter('non-active'); setCurrentPage(1); }} 
                    className={`px-4 py-2 rounded ${statusFilter === 'non-active' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Non Active
                </button>
            </div>
            
            {/* Controls Row */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 md:items-center">
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="px-3 py-2 border rounded bg-white text-gray-700 flex items-center gap-1">
                        <span>Table</span>
                    </button>
                    <button className="px-3 py-2 border rounded bg-white text-gray-700 flex items-center gap-1">
                        <span>Columns</span>
                    </button>
                    <button className="px-3 py-2 border rounded bg-white text-gray-700 flex items-center gap-1">
                        <span>Filter</span>
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Search Product"
                    value={searchPro}
                    onChange={(e) => { setSearchPro(e.target.value); setCurrentPage(1); }}
                    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {paginatedProducts.map((product) => {
                        const inBasket = basket.includes(product.id)
                        return (
                            <div
                                key={product.id}
                                className={`relative border rounded-lg p-4 shadow bg-white transition ${inBasket ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                            >                                
                                <Link href={`/dashboard/product-detail/${product.id}`}>
                                    <Image
                                        src={`/assets/${product.image}`}
                                        alt={product.name}
                                        width={300}
                                        height={200}
                                        className="aspect-square w-full bg-gray-200 object-cover rounded-2xl"
                                    />
                                </Link>
                                <div className="pt-3 px-2 pb-2">
                                    <h5 className="text-lg font-semibold tracking-tight text-gray-900 mb-1">{product.name}</h5>
                                    <div className="text-xs text-gray-500 mb-2">Smart Watch</div>
                                    <div className="flex items-center mb-2">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating)
                                                        ? "text-yellow-300"
                                                        : "text-gray-200 dark:text-gray-600"
                                                        }`}
                                                    fill="currentColor"
                                                    viewBox="0 0 22 20"
                                                >
                                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734L12.376 1.27a1.534 1.534 0 0 0-2.752 0L7.365 6.581l-5.051.734a1.535 1.535 0 0 0-.85 2.62l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03 3.656-3.563a1.523 1.523 0 0 0 .387-1.575Z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm ms-3">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-gray-900">{product.Price}</span>
                                        {!inBasket && (
                                            <button
                                                onClick={() => handleToggleBasket(product.id)}
                                                className="px-3 py-1 rounded text-sm font-medium mt-2 bg-blue-500 text-white hover:bg-blue-600"
                                            >
                                                Add to Basket
                                            </button>
                                        )}
                                        {inBasket && (
                                            <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                                                In Basket
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <div>
                        <Image
                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8OEAkQEAgLCgkLBwoHDQ0NBxAICggNIB0iFiAdHx8kHCggJBolGx8fITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EAD8QAAICAQIBBwgIBQMFAAAAAAECAAMEERITBSEiMUFRYRQjMlJxgZGSBhUzQmKhscEkQ1NyskSCojRUZMLR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERATzvKnKlyNlaW0Y64vDuVGG+zPB7B3a845tTrPRSu+LWzJY1KNai6K7VhmQeBgSU2B1RgCAyK4BGjDWSREBERAREQEREBERAREQEREBESK+zapPb1CBi68L4t3So+Sx7do8JGTrrz6kzEDbiN67fNHEb12+aayLIyEqV3ewV1ou4sYE/Eb12+aVsrlOunTiZS1k9Sl+k3u65TrTIy+fc2DhnqPo5N6/+o/P2STbg4XPtrWw/eduLdc36mA+vVPoU5to70wX2/npMHlzT0sbOrHe2C7L+Wsz9fE/Z8n5di9jLhrWrfMRH1449Pk3LRe/yVb1/wCJMCbF5XptOiZas/ql+HZ8Dzy3xG9dvmnOORhZgKlKbbB91l4d1fuPOJCca/G56XbKxx149r7rlX8DfsYHX4jeu3zRxG9dvmlXCzEuXcjHmbaysu2ylu4jsMsQNuI3rt80cRvXb5prpzdY13bdIgbcRvXb5pumSw7dw8ZFEDoU3hvBu6TTlA6ac+hE6FFm5Qe3qMCWIiAiIgIiICUc1ucDsCy9KGaOl7VgUM42bG4f2u6vT+3Ua/lrLEhy6eIlqbihsqasMPut3xjOGVemthXzbMvo7xzH84EljhQzMwVFXczH0VWc7Ao8qZci4EYyNuxqG/zI7z2dwjlN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rcMAQeY/MpgdvkLPbHcYl5IXdw6HZvR/AT+hnp55HauZXscgZla+bb0eMo7PbOj9HuVWfWi4kZda9Fm6PlKDt9o7YHdiIgJ1E6l9koY1e4j1R0jOjAREQEREBERAREQI7wCG5tdBrObOqROfdSVJ5tV7DAiI+BkWPjrUoVE2oOlp6UliAiIgIiIG9TKN2q7tV5ppEQE8t9JOSuGXyKk1rbpXoq+j+MfvPUzBGuvNqD1gwPA1vptZW0I6SsGnRvTypRajcPlCjzh2+lZp94fuJDy1yZ5I+5VPkVr83/iOez2HslWqxkIKuUcdRDQPVchcqjJQhgEyqujan7jwM6k8FiWMl+G6E8RsquggfzEJ5wf190+hU0liObRe0wLtAAC82mo1kkwBMwEREBERAREQEREBERAxtHcPhMbR3D5ZtEDXaO4fLG0dw+WbRA12juHyxtHcPlm0QNdo7h8sbR3D5ZtEDXaO4fLG0dw+WbRAhycZLUdHrV63QoykekJ4XL+i2XUzLUi5VG7zbNeK7Kx3Nr+on0CIHm/o99GxQRdcVuzNvR0+yxh3L4+M9JEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//Z"
                            alt="No product found"
                            width={300}
                            height={300}
                        />
                        <div className="text-center text-gray-600 dark:text-gray-300">
                            No product found
                        </div>
                    </div>
                </div>
            )}
            
            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
                <div className="text-sm text-gray-500">Show {itemsPerPage} per page</div>
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-white border text-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
