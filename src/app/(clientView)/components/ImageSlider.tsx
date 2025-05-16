import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
const sliderContent = [
    {
        title: 'New Arrivals',
        subtitle: 'Latest fashion & gadgets',
        image: '/assets/mega-menu-category-01.jpg',
    },
    {
        title: 'Exclusive Deals',
        subtitle: 'Limited time discounts',
        image: '/assets/mega-menu-category-02.jpg',
    },
    {
        title: 'Upgrade Your Space',
        subtitle: 'Trendy home decor',
        image: '/assets/mega-menu-category-02.jpg',
    },
]
export default function ImageSliderComponent() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const router = useRouter()
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === sliderContent.length - 1 ? 0 : prev + 1))
        }, 2000)
        return () => clearInterval(timer)
    }, [currentIndex])
    return (
        <div>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                    src={sliderContent[currentIndex].image}
                    alt={`Slide ${currentIndex}`}
                    fill
                    className="object-cover transition duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2 drop-shadow-md">
                        {sliderContent[currentIndex].title}
                    </h2>
                    <p className="text-lg sm:text-xl text-white drop-shadow-sm">
                        {sliderContent[currentIndex].subtitle}
                    </p>
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <button
                        onClick={() =>
                            setCurrentIndex(currentIndex === 0 ? sliderContent.length - 1 : currentIndex - 1)
                        }
                        className="bg-white/70 hover:bg-white rounded-full p-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M15 19l-7-7 7-7" stroke="black" strokeWidth="2" />
                        </svg>
                    </button>
                    <button
                        onClick={() =>
                            setCurrentIndex(currentIndex === sliderContent.length - 1 ? 0 : currentIndex + 1)
                        }
                        className="bg-white/70 hover:bg-white rounded-full p-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5l7 7-7 7" stroke="black" strokeWidth="2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}