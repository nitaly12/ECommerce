'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function BasketPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get the items from query string
  const itemsParam = searchParams.get('items') || ''
  const itemIds = itemsParam.split(',').map(id => Number(id)).filter(Boolean)

  // Same product list as your ProductListComponent
  const products = [
    { id: 1, image: 'mega-menu-category-01.jpg', name: 'Apple Watch 1', price: '$399' },
    { id: 2, image: 'mega-menu-category-02.jpg', name: 'Smart Watch 2', price: '$999' },
    { id: 3, image: 'product-page-01-related-product-01.jpg', name: 'Apple Watch 3', price: '$599' },
    { id: 4, image: 'apple-watch.png', name: 'Apple Watch 4', price: '$899' },
  ]

  const [basket, setBasket] = useState<number[]>(itemIds)

  const handleRemove = (id: number) => {
    setBasket(basket.filter(item => item !== id))
  }

  useEffect(() => {
    router.replace(`/dashboard/basket?items=${basket.join(',')}`)
  }, [basket, router])

  const basketProducts = products.filter(product => basket.includes(product.id))

  if (basketProducts.length === 0) {
    return (
      <div className="pt-10 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Your Basket is empty</h1>
        <button
          onClick={() => router.push('/dashboard/products')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="pt-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Basket</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {basketProducts.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow relative">
            <Image
              src={`/assets/${product.image}`}
              alt={product.name}
              width={300}
              height={300}
              className="rounded-lg w-full h-60 object-cover"
            />
            <h2 className="text-lg font-semibold mt-3">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.price}</p>

            <button
              onClick={() => handleRemove(product.id)}
              className="px-3 py-1 rounded text-sm font-medium mt-2 bg-red-500 text-white hover:bg-red-600"
            >
              Remove from Basket
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
