// import NavbarComponent from "@/components/NavbarConponent";
// import SideBarComponent from "@/components/SideBarComponent";
// import Profile from "./profile/page";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="w-full">
//       <NavbarComponent />

//       <div className="flex">
//         {/* Sidebar with fixed width */}
//         <div className="w-64">
//           <SideBarComponent />
//         </div>

//         <main className="flex-1 p-6 ">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
'use client';

import { AdminApprovalCard } from '@/components/AdminCard';
import { useState } from 'react';
import DeviceManagement from './DeviceManagement';
import AttendanceManagement from './AttendanceManagement';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    // ✅ Do your approve API logic here
    await new Promise((r) => setTimeout(r, 1000)); // simulate request
    setLoading(false);
    alert('Device switch approved!');
  };

  return (
    // <AdminApprovalCard
    //   user="john.doe@company.com"
    //   newDevice="Device B"
    //   currentDevice="Device A"
    //   onApprove={handleApprove}
    //   loading={loading}
    // />
    // <DeviceManagement />
    <div>
      <AttendanceManagement/>
    </div>
  );
}
