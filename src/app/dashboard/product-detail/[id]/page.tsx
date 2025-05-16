// 'use client'
// import { useParams } from 'next/navigation'
// import DetailComponent from '../../_components/DetailComponent';

// const products = [
//         {
//             id: 1,
//             image: 'mega-menu-category-01.jpg',
//             name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
//             rating: 4.5,
//             Price: '$399',
//         },
//         {
//             id: 2,
//             image: 'mega-menu-category-02.jpg',
//             name: 'Smart Watch, Aluminium Case, Starlight Sport',
//             rating: 2.5,
//             Price: '$999',
//         },
//         {
//             id: 3,
//             image: 'product-page-01-related-product-01.jpg',
//             name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
//             rating: 3.0,
//             Price: '$599',
//         },
//         {
//             id: 4,
//             image: 'product-page-01-related-product-04.jpg',
//             name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
//             rating: 5.0,
//             Price: '$899',
//         },
//         {
//             id: 5,
//             image: 'product-page-01-related-product-02.jpg',
//             name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
//             rating: 4.0,
//             Price: '$299',
//         },

//         {
//             id: 6,
//             image: 'product-page-01-related-product-03.jpg',
//             name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
//             rating: 5.0,
//             Price: '$599',
//         },
//     ]
// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const product = products.find(p => p.id === Number(id));

//   if (!product) return <div className="p-10">Product not found.</div>;

//   return (
//     <div className="p-10">
//       <DetailComponent product={products}/>
//     </div>
//   );
// }
// ProductDetailPage.tsx
'use client'
import { useParams } from 'next/navigation'
import DetailComponent from '../../_components/DetailComponent';

const products = [
  {
    id: 1,
    image: 'mega-menu-category-01.jpg',
    name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
    rating: 4.5,
    Price: '$399',
  },
  {
    id: 2,
    image: 'mega-menu-category-02.jpg',
    name: 'Smart Watch, Aluminium Case, Starlight Sport',
    rating: 2.5,
    Price: '$999',
  },
  {
    id: 3,
    image: 'product-page-01-related-product-01.jpg',
    name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
    rating: 3.0,
    Price: '$599',
  },
  {
    id: 4,
    image: 'apple-watch.png',
    name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
    rating: 5.0,
    Price: '$899',
  },
  {
    id: 5,
    image: 'product-page-01-related-product-02.jpg',
    name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
    rating: 4.0,
    Price: '$299',
  },
  {
    id: 6,
    image: 'product-page-01-related-product-03.jpg',
    name: 'Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport',
    rating: 5.0,
    Price: '$599',
  },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <div className="p-10">Product not found.</div>;

  return (
    <div className="p-10">
      {/* Pass the correct single product to the DetailComponent */}
      <DetailComponent product={product} />
    </div>
  );
}
