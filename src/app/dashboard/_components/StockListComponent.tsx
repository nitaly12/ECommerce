'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateProductAction from "@/app/action/UpdateProductAction";
import { use, useState } from "react"
import Image from 'next/image';
export default function StockListComponent() {
    const [searchItem, setSearchItem] = useState("");
    const [editProduct, setEditProduct] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 9;
    const [products, setProduct] = useState([
        {
            id: 1,
            name: 'Apple MacBook Pro 17"',
            color: 'Silver',
            Category: 'Laptop',
            Price: '$2999',
        },
        {
            id: 2,
            name: 'Microsoft Surface Pro',
            color: ' White',
            Category: 'Laptop',
            Price: '$2899',
        },
        {
            id: 3,
            name: 'Magic Mouse 2',
            color: 'Black',
            Category: 'Accessories',
            Price: '$199',
        },
        {
            id: 4,
            name: 'Apple Watch',
            color: 'Silver',
            Category: 'Laptop',
            Price: '$2999',
        },
        {
            id: 5,
            name: 'iPad',
            color: ' Gold',
            Category: 'Tablet',
            Price: '$999',
        },

        {
            id: 6,
            name: 'Apple iMac 27',
            color: 'Silver',
            Category: 'PC Desktop',
            Price: '$3999',
        },
        {
            id: 7,
            name: 'Apple Watch',
            color: 'Silver',
            Category: 'Laptop',
            Price: '$2999',
        },
        {
            id: 8,
            name: 'iPad',
            color: ' Gold',
            Category: 'Tablet',
            Price: '$999',
        },

        {
            id: 9,
            name: 'Apple iMac 27',
            color: 'Silver',
            Category: 'PC Desktop',
            Price: '$3999',
        }, {
            id: 10,
            name: 'Apple Watch',
            color: 'Silver',
            Category: 'Laptop',
            Price: '$2999',
        },
        {
            id: 11,
            name: 'iPad',
            color: ' Gold',
            Category: 'Tablet',
            Price: '$999',
        },

        {
            id: 12,
            name: 'Apple iMac 27',
            color: 'Silver',
            Category: 'PC Desktop',
            Price: '$3999',
        },
    ])
    //edit product
    const handleUpdate = (updateProduct: { id: any; }) => {
        // setEditProduct(prev => prev.map((pro: { id: any; }) => (pro.id === updateProduct.id ? updateProduct : pro))
        // );

    }
    //delete product
    const handleDelete = (id: number) => {
        setProduct(prevUsers => prevUsers.filter(pro => pro.id !== id));
        toast.success("Product deleted successfully!");
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
        <div>
            <h1 className="text-3xl text-gray-700 pb-14">Stock Management</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="pb-4 bg-white dark:bg-gray-900">
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search htmlFor items"
                            value={searchItem}
                            onChange={(e) => { setSearchItem(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-3">
                                DELETE
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterItems.length > 0 ? (
                            currentProducts.map((pro) => (
                                <tr key={pro.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    { }
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {pro.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {pro.color}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.Category}
                                    </td>
                                    <td className="px-6 py-4">
                                        {pro.Price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <UpdateProductAction
                                        // product={products}
                                        // onUpdate={handleUpdate}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => handleDelete(pro.id)} className="text-red-600 hover:underline">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))

                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    <div className="flex justify-center">
                                        <div>
                                            <Image
                                                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8OEAkQEAgLCgkLBwoHDQ0NBxAICggNIB0iFiAdHx8kHCggJBolGx8fITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EAD8QAAICAQIBBwgIBQMFAAAAAAECAAMEERITBSEiMUFRYRQjMlJxgZGSBhUzQmKhscEkQ1NyskSCojRUZMLR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERATzvKnKlyNlaW0Y64vDuVGG+zPB7B3a845tTrPRSu+LWzJY1KNai6K7VhmQeBgSU2B1RgCAyK4BGjDWSREBERAREQEREBERAREQEREBESK+zapPb1CBi68L4t3So+Sx7do8JGTrrz6kzEDbiN67fNHEb12+aayLIyEqV3ewV1ou4sYE/Eb12+aVsrlOunTiZS1k9Sl+k3u65TrTIy+fc2DhnqPo5N6/+o/P2STbg4XPtrWw/eduLdc36mA+vVPoU5to70wX2/npMHlzT0sbOrHe2C7L+Wsz9fE/Z8n5di9jLhrWrfMRH1449Pk3LRe/yVb1/wCJMCbF5XptOiZas/ql+HZ8Dzy3xG9dvmnOORhZgKlKbbB91l4d1fuPOJCca/G56XbKxx149r7rlX8DfsYHX4jeu3zRxG9dvmlXCzEuXcjHmbaysu2ylu4jsMsQNuI3rt80cRvXb5prpzdY13bdIgbcRvXb5pumSw7dw8ZFEDoU3hvBu6TTlA6ac+hE6FFm5Qe3qMCWIiAiIgIiICUc1ucDsCy9KGaOl7VgUM42bG4f2u6vT+3Ua/lrLEhy6eIlqbihsqasMPut3xjOGVemthXzbMvo7xzH84EljhQzMwVFXczH0VWc7Ao8qZci4EYyNuxqG/zI7z2dwjlN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rcMAQeY/MpgdvkLPbHcYl5IXdw6HZvR/AT+hnp55HauZXscgZla+bb0eMo7PbOj9HuVWfWi4kZda9Fm6PlKDt9o7YHdiIgJ1E6l9koY1e4j1R0jOjAREQEREBERAREQI7wCG5tdBrObOqROfdSVJ5tV7DAiI+BkWPjrUoVE2oOlp6UliAiIgIiIG9TKN2q7tV5ppEQE8t9JOSuGXyKk1rbpXoq+j+MfvPUzBGuvNqD1gwPA1vptZW0I6SsGnRvTypRajcPlCjzh2+lZp94fuJDy1yZ5I+5VPkVr83/iOez2HslWqxkIKuUcdRDQPVchcqjJQhgEyqujan7jwM6k8FiWMl+G6E8RsquggfzEJ5wf190+hU0liObRe0wLtAAC82mo1kkwBMwEREBERAREQEREBERAxtHcPhMbR3D5ZtEDXaO4fLG0dw+WbRA12juHyxtHcPlm0QNdo7h8sbR3D5ZtEDXaO4fLG0dw+WbRAhycZLUdHrV63QoykekJ4XL+i2XUzLUi5VG7zbNeK7Kx3Nr+on0CIHm/o99GxQRdcVuzNvR0+yxh3L4+M9JEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//Z"
                                                alt="No users found"
                                                width={300}
                                                height={300}
                                            />
                                            <div className="text-center text-gray-600 dark:text-gray-300">
                                                No user found
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
            />
            {/* pagination */}
            <div className="flex justify-end items-center mt-8">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm mx-4 text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}


// 'use client'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import UpdateProductAction from "@/app/action/UpdateProductAction";
// import { use, useState } from "react"
// import Image from 'next/image';

// interface Product {
//   id: number;
//   name: string;
//   color: string;
//   Category: string;
//   Price: string;
// } 

// export default function StockListComponent() {
//     const [searchItem, setSearchItem] = useState("");
//     const [editProduct, setEditProduct] = useState();
//     const [currentPage, setCurrentPage] = useState(1);
//     const productPerPage = 9;
//     const [products, setProduct] = useState([
//         {
//             id: 1,
//             name: 'Apple MacBook Pro 17"',
//             color: 'Silver',
//             Category: 'Laptop',
//             Price: '$2999',
//         },
//         {
//             id: 2,
//             name: 'Microsoft Surface Pro',
//             color: ' White',
//             Category: 'Laptop',
//             Price: '$2899',
//         },
//         {
//             id: 3,
//             name: 'Magic Mouse 2',
//             color: 'Black',
//             Category: 'Accessories',
//             Price: '$199',
//         },
//         {
//             id: 4,
//             name: 'Apple Watch',
//             color: 'Silver',
//             Category: 'Laptop',
//             Price: '$2999',
//         },
//         {
//             id: 5,
//             name: 'iPad',
//             color: ' Gold',
//             Category: 'Tablet',
//             Price: '$999',
//         },

//         {
//             id: 6,
//             name: 'Apple iMac 27',
//             color: 'Silver',
//             Category: 'PC Desktop',
//             Price: '$3999',
//         },
//         {
//             id: 7,
//             name: 'Apple Watch',
//             color: 'Silver',
//             Category: 'Laptop',
//             Price: '$2999',
//         },
//         {
//             id: 8,
//             name: 'iPad',
//             color: ' Gold',
//             Category: 'Tablet',
//             Price: '$999',
//         },

//         {
//             id: 9,
//             name: 'Apple iMac 27',
//             color: 'Silver',
//             Category: 'PC Desktop',
//             Price: '$3999',
//         }, {
//             id: 10,
//             name: 'Apple Watch',
//             color: 'Silver',
//             Category: 'Laptop',
//             Price: '$2999',
//         },
//         {
//             id: 11,
//             name: 'iPad',
//             color: ' Gold',
//             Category: 'Tablet',
//             Price: '$999',
//         },

//         {
//             id: 12,
//             name: 'Apple iMac 27',
//             color: 'Silver',
//             Category: 'PC Desktop',
//             Price: '$3999',
//         },
//     ])
//     //edit product
//     const handleUpdate = (updatedProduct: Product) => {
//         setProduct((prev) =>
//             prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
//         );
//     };

//     //delete product
//     const handleDelete = (id: number) => {
//         setProduct(prevUsers => prevUsers.filter(pro => pro.id !== id));
//         toast.success("Product deleted successfully!");
//     };
//     const filterItems = products.filter(pro =>
//         pro.name.toLowerCase().includes(searchItem.toLowerCase())
//     );
//     //pagination logic
//     const indexOflastProduct = currentPage * productPerPage;
//     const indexOfFirstProduct = indexOflastProduct - productPerPage;
//     const currentProducts = filterItems.slice(indexOfFirstProduct, indexOflastProduct);

//     const totalPages = Math.ceil(filterItems.length / productPerPage);
//     return (
//         <div>
//             <h1 className="text-3xl text-gray-700 pb-14">Stock Management</h1>
//             <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white border border-gray-200 rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//                 <div className="pb-4 bg-white dark:bg-gray-900">
//                     <label htmlFor="table-search" className="sr-only">Search</label>
//                     <div className="relative mt-1">
//                         <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
//                             <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
//                                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
//                             </svg>
//                         </div>
//                         <input
//                             type="text"
//                             id="table-search"
//                             className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Search htmlFor items"
//                             value={searchItem}
//                             onChange={(e) => { setSearchItem(e.target.value); setCurrentPage(1); }}
//                         />
//                     </div>
//                 </div>
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="p-4">
//                                 <div className="flex items-center">
//                                     <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                                     <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
//                                 </div>
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Product name
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Color
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Category
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Price
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Action
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 DELETE
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filterItems.length > 0 ? (
//                             currentProducts.map((pro) => (
//                                 <tr key={pro.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                     <td className="w-4 p-4">
//                                         <div className="flex items-center">
//                                             <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
//                                             <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
//                                         </div>
//                                     </td>
//                                     { }
//                                     <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                         {pro.name}
//                                     </th>
//                                     <td className="px-6 py-4">
//                                         {pro.color}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {pro.Category}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         {pro.Price}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <UpdateProductAction
//                                         product={pro}
//                                         onUpdate={handleUpdate}
//                                         />
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <button onClick={() => handleDelete(pro.id)} className="text-red-600 hover:underline">
//                                             Delete
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))

//                         ) : (
//                             <tr>
//                                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                                     <div className="flex justify-center">
//                                         <div>
//                                             <Image
//                                                 src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8OEAkQEAgLCgkLBwoHDQ0NBxAICggNIB0iFiAdHx8kHCggJBolGx8fITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EAD8QAAICAQIBBwgIBQMFAAAAAAECAAMEERITBSEiMUFRYRQjMlJxgZGSBhUzQmKhscEkQ1NyskSCojRUZMLR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERATzvKnKlyNlaW0Y64vDuVGG+zPB7B3a845tTrPRSu+LWzJY1KNai6K7VhmQeBgSU2B1RgCAyK4BGjDWSREBERAREQEREBERAREQEREBESK+zapPb1CBi68L4t3So+Sx7do8JGTrrz6kzEDbiN67fNHEb12+aayLIyEqV3ewV1ou4sYE/Eb12+aVsrlOunTiZS1k9Sl+k3u65TrTIy+fc2DhnqPo5N6/+o/P2STbg4XPtrWw/eduLdc36mA+vVPoU5to70wX2/npMHlzT0sbOrHe2C7L+Wsz9fE/Z8n5di9jLhrWrfMRH1449Pk3LRe/yVb1/wCJMCbF5XptOiZas/ql+HZ8Dzy3xG9dvmnOORhZgKlKbbB91l4d1fuPOJCca/G56XbKxx149r7rlX8DfsYHX4jeu3zRxG9dvmlXCzEuXcjHmbaysu2ylu4jsMsQNuI3rt80cRvXb5prpzdY13bdIgbcRvXb5pumSw7dw8ZFEDoU3hvBu6TTlA6ac+hE6FFm5Qe3qMCWIiAiIgIiICUc1ucDsCy9KGaOl7VgUM42bG4f2u6vT+3Ua/lrLEhy6eIlqbihsqasMPut3xjOGVemthXzbMvo7xzH84EljhQzMwVFXczH0VWc7Ao8qZci4EYyNuxqG/zI7z2dwjlN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rcMAQeY/MpgdvkLPbHcYl5IXdw6HZvR/AT+hnp55HauZXscgZla+bb0eMo7PbOj9HuVWfWi4kZda9Fm6PlKDt9o7YHdiIgJ1E6l9koY1e4j1R0jOjAREQEREBERAREQI7wCG5tdBrObOqROfdSVJ5tV7DAiI+BkWPjrUoVE2oOlp6UliAiIgIiIG9TKN2q7tV5ppEQE8t9JOSuGXyKk1rbpXoq+j+MfvPUzBGuvNqD1gwPA1vptZW0I6SsGnRvTypRajcPlCjzh2+lZp94fuJDy1yZ5I+5VPkVr83/iOez2HslWqxkIKuUcdRDQPVchcqjJQhgEyqujan7jwM6k8FiWMl+G6E8RsquggfzEJ5wf190+hU0liObRe0wLtAAC82mo1kkwBMwEREBERAREQEREBERAxtHcPhMbR3D5ZtEDXaO4fLG0dw+WbRA12juHyxtHcPlm0QNdo7h8sbR3D5ZtEDXaO4fLG0dw+WbRAhycZLUdHrV63QoykekJ4XL+i2XUzLUi5VG7zbNeK7Kx3Nr+on0CIHm/o99GxQRdcVuzNvR0+yxh3L4+M9JEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//Z"
//                                                 alt="No users found"
//                                                 width={300}
//                                                 height={300}
//                                             />
//                                             <div className="text-center text-gray-600 dark:text-gray-300">
//                                                 No user found
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                             </tr>
//                         )}

//                     </tbody>
//                 </table>
//             </div>
//             <ToastContainer
//                 position="top-center"
//                 autoClose={2000}
//             />
//             {/* pagination */}
//             <div className="flex justify-end items-center mt-8">
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-4 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
//                 >
//                     Previous
//                 </button>
//                 <span className="text-sm mx-4 text-gray-700">
//                     Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-4 py-1 text-white bg-blue-600 rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     )
// }