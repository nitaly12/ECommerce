"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface Product {
    id: number;
    name: string;
    color: string;
    category: string;
    price: number;
}

interface Props {
    product: Product;
    onUpdated?: () => void;
}

export default function UpdateProductAction({ product, onUpdated }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        name: product.name,
        color: product.color,
        category: product.category,
        price: product.price,
    });

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(
                `http://localhost:8080/api/stock-items/${product.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token ? { Authorization: `Bearer ${token}` } : {}),
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        color: formData.color,
                        category: formData.category,
                        price: Number(formData.price),
                    }),
                }
            );

            if (!res.ok) throw new Error("Update failed");

            toast.success("Product updated successfully!");
            setMenuOpen(false);

            // 🔥 refresh list
            onUpdated?.();

        } catch (error) {
            console.error(error);
            toast.error("Update failed");
        }
    };

    return (
        <div ref={menuRef}>
            {/* Edit Button */}
            <button
                className="font-medium text-blue-600 hover:underline"
                onClick={() => setMenuOpen(true)}
            >
                Edit
            </button>

            {/* Modal */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black/20">
                    <div className="bg-white rounded-lg w-full max-w-md p-4">

                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-bold">Update Product</h2>
                            <button onClick={() => setMenuOpen(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                placeholder="Name"
                            />

                            <input
                                type="color"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                className="w-full"
                            />

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                            >
                                <option value="Laptop">Laptop</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Tablet">Tablet</option>
                                <option value="PC Desktop">PC Desktop</option>
                            </select>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                placeholder="Price"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-2 rounded"
                            >
                                Update Product
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}


// "use client";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";

// interface Product {
//   id: number;
//   name: string;
//   color: string;
//   Category: string;
//   Price: string;
// }

// interface UpdateProductActionProps {
//   product: Product;
//   onUpdate: (updatedProduct: Product) => void;
// }

// export default function UpdateProductAction({ product, onUpdate }: UpdateProductActionProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);

//   const [formData, setFormData] = useState({
//     name: product.name,
//     color: product.color,
//     category: product.Category,
//     price: product.Price,
//   });

//   // Close modal if clicked outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setMenuOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle form input changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Submit the form
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     onUpdate({
//       ...product,
//       name: formData.name,
//       color: formData.color,
//       Category: formData.category,
//       Price: formData.price,
//     });

//     toast.success("Product updated successfully!");
//     setMenuOpen(false);
//   };

//   return (
//     <div ref={menuRef}>
//       {/* Toggle Button */}
//       <button
//         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//         onClick={() => setMenuOpen((prev) => !prev)}
//       >
//         Edit
//       </button>

//       {/* Modal */}
//       {menuOpen && (
//         <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen bg-opacity-20 inset-0 backdrop-blur-sm bg-white/0">
//           <div className="relative p-4 w-full max-w-md">
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//               {/* Modal header */}
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
//                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update Product</h3>
//                 <button
//                   type="button"
//                   onClick={() => setMenuOpen(false)}
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
//                 >
//                   <svg className="w-3 h-3" fill="none" viewBox="0 0 14 14">
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Modal body */}
//               <form onSubmit={handleSubmit} className="p-4 md:p-5">
//                 <div className="grid gap-4 mb-4 grid-cols-2">
//                   <div className="col-span-2">
//                     <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       Product Name
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                       placeholder="Type product name"
//                     />
//                   </div>

//                   <div className="col-span-2 sm:col-span-1">
//                     <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       Color
//                     </label>
//                     <input
//                       type="color"
//                       name="color"
//                       id="color"
//                       value={formData.color}
//                       onChange={handleChange}
//                       className="w-full h-10 p-1 rounded"
//                     />
//                   </div>

//                   <div className="col-span-2 sm:col-span-1">
//                     <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       Category
//                     </label>
//                     <select
//                       id="category"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                     >
//                       <option value="">Select category</option>
//                       <option value="TV">Laptop</option>
//                       <option value="PC">Accessories</option>
//                       <option value="GA">Tablet</option>
//                       <option value="PH">PC Desktop</option>
//                     </select>
//                   </div>

//                   <div className="col-span-2">
//                     <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                       Price
//                     </label>
//                     <input
//                       type="number"
//                       name="price"
//                       id="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
//                       placeholder="$2999"
//                     />
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
//                 >
//                   <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       d="M10 5a1 1 0 011 1v3h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 011-1z"
//                       clipRule="evenodd"
//                       fillRule="evenodd"
//                     />
//                   </svg>
//                   Update product
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }