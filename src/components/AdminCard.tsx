'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface AdminApprovalCardProps {
  user: string;
  newDevice: string;
  currentDevice: string;
  onApprove: () => void;
  loading: boolean;
}

export const AdminApprovalCard: React.FC<AdminApprovalCardProps> = ({
  user,
  newDevice,
  currentDevice,
  onApprove,
  loading
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-auto max-w-sm rounded-lg border border-purple-500 p-6 text-center">
      <h2 className="mb-4 text-xl font-bold text-purple-700">Admin Dashboard</h2>

      <Card className="border-orange-400 bg-yellow-50">
        <CardHeader>
          <CardTitle>Pending Approval</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-left">
          <p><strong>User:</strong> {user}</p>
          <p><strong>New Device:</strong> {newDevice}</p>
          <p><strong>Current Device:</strong> {currentDevice}</p>
        </CardContent>
      </Card>

      <Button
        disabled={loading}
        className="mt-6 w-full bg-green-600 text-white hover:bg-green-700"
        onClick={onApprove}
      >
        Approve Device Switch
      </Button>
    </div>
  );
};
