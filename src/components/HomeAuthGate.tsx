'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeAuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.replace('/sign-in');
      return;
    }
    setShow(true);
  }, [router]);

  if (!show) return null;
  return <>{children}</>;
}
