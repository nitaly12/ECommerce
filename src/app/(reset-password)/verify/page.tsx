'use client'
import { useRouter } from "next/navigation";
import VerifyComponent from "../_component/VerifyComponent";
import Image from "next/image";
import { useEffect } from "react";
export default function VerifyPage() {
  const router = useRouter()
useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/sign-in');
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);
  return (
    <div>
      <div>
        <Image
          className="absolute left-[50%] top-[35%] sm:top-[40%] lg:top-[32%] transform -translate-x-[50%] size-[230px] sm:size-[290px] 2xl:size-[300px]"
          src="/assets/Verified-rafiki 1.svg"
          alt="Verification success image"
          width={400}
          height={200}
        />
      </div>
      <VerifyComponent />
    </div>
  )
}