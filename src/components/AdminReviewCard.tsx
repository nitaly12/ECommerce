'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface AdminReviewCardProps {
  hasPendingDevice: boolean;
}

export const AdminReviewCard: React.FC<AdminReviewCardProps> = ({
  hasPendingDevice
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !hasPendingDevice) {
    return null;
  }

  return (
    <Card className="mx-auto max-w-sm border border-blue-300 bg-gradient-to-b from-blue-50 to-white p-6 text-center shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-blue-600">Admin Review</h2>
      <p className="text-gray-600">
        New login device appears in admin page <br />
        Waiting for approval decision
      </p>
    </Card>
  );
};
