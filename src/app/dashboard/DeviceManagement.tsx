// app/(auth)/approval/page.tsx

"use client";
import React, { useState } from "react";

const mockDevices = [
  {
    user: "User's Iphone",
    device: "iOS 16.1",
    lastAccess: "2 min ago",
    status: "PENDING",
  },
  {
    user: "User's Iphone",
    device: "Android 13",
    lastAccess: "2 min ago",
    status: "PENDING",
  },
  {
    user: "User's Iphone",
    device: "Android 13",
    lastAccess: "2 min ago",
    status: "APPROVED",
  },
  {
    user: "User's Iphone",
    device: "Android 13",
    lastAccess: "2 min ago",
    status: "REJECT",
  },
];

export default function DeviceManagementPage() {
  const [devices, setDevices] = useState(mockDevices);

  const handleApprove = (idx: number) => {
    setDevices((prev) =>
      prev.map((d, i) =>
        i === idx ? { ...d, status: "APPROVED" } : d
      )
    );
  };

  const handleReject = (idx: number) => {
    setDevices((prev) =>
      prev.map((d, i) =>
        i === idx ? { ...d, status: "REJECT" } : d
      )
    );
  };

  const handleApproveAll = () => {
    setDevices((prev) =>
      prev.map((d) =>
        d.status === "PENDING" ? { ...d, status: "APPROVED" } : d
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-600 mb-1">Device Management</h1>
      <p className="text-gray-500 mb-6">
        Orchestrate your team’s digital presence: sculpt user rosters, fine-tune work rhythms, and seamlessly onboard or offboard members.
      </p>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-3 py-2 w-1/3"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded font-semibold"
          onClick={handleApproveAll}
        >
          Approve All
        </button>
      </div>
      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Device</th>
              <th className="py-3 px-4">Last Access</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((d, idx) => (
              <tr key={idx} className="border-b last:border-b-0">
                <td className="py-3 px-4">{d.user}</td>
                <td className="py-3 px-4">{d.device}</td>
                <td className="py-3 px-4">{d.lastAccess}</td>
                <td className="py-3 px-4 font-semibold">
                  {d.status === "APPROVED" ? (
                    <span className="text-green-600">{d.status}</span>
                  ) : d.status === "REJECT" ? (
                    <span className="text-red-500">{d.status}</span>
                  ) : (
                    d.status
                  )}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  {d.status === "PENDING" && (
                    <>
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                        onClick={() => handleApprove(idx)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleReject(idx)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}