// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface AttendanceDetail {
//   date: string;
//   checkInTime: string;
//   checkOutTime: string;
//   lateDuration: string;
//   missingScan: boolean;
// }

// interface AttendanceListResponseDto {
//   content: AttendanceDetail[];
//   totalPages: number;
//   number: number;
//   size: number;
// }

// const mockUserAttendanceData: AttendanceListResponseDto = {
//   content: [
//     {
//       date: "01/08/2024",
//       checkInTime: "07:25:00 AM",
//       checkOutTime: "04:11:21 PM",
//       lateDuration: "0 minutes",
//       missingScan: false
//     },
//     {
//       date: "01/09/2024",
//       checkInTime: "08:15:00 AM",
//       checkOutTime: "05:30:00 PM",
//       lateDuration: "15 minutes",
//       missingScan: true
//     },
//     {
//       date: "01/10/2024",
//       checkInTime: "07:45:00 AM",
//       checkOutTime: "04:45:00 PM",
//       lateDuration: "0 minutes",
//       missingScan: false
//     },
//     {
//       date: "01/11/2024",
//       checkInTime: "08:30:00 AM",
//       checkOutTime: "05:15:00 PM",
//       lateDuration: "30 minutes",
//       missingScan: true
//     },
//     {
//       date: "01/12/2024",
//       checkInTime: "07:20:00 AM",
//       checkOutTime: "04:20:00 PM",
//       lateDuration: "0 minutes",
//       missingScan: false
//     }
//   ],
//   totalPages: 1,
//   number: 0,
//   size: 25
// };

// export default function UserAttendanceDetailPage({ params }: { params: { userId: string } }) {
//   const router = useRouter();
//   const [userAttendanceData, setUserAttendanceData] = useState<AttendanceListResponseDto | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     setLoading(true);
//     // TODO: Replace with real API call
//     setTimeout(() => {
//       setUserAttendanceData(mockUserAttendanceData);
//       setLoading(false);
//     }, 500);
//   }, [params.userId]);

//   const filteredData = userAttendanceData?.content.filter(record =>
//     record.date.includes(searchTerm)
//   ) || [];

//   return (
//     <div style={{ maxWidth: 1200, margin: "40px auto", background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1)" }}>
//       {/* Breadcrumb and Header */}
//       <div style={{ marginBottom: 24 }}>
//         <button onClick={() => router.push("/dashboard/attendance")} style={{ marginBottom: 12, background: "none", border: "none", color: "#3b82f6", fontSize: 16, cursor: "pointer" }}>← Back</button>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
//           <span>Attendance Management</span>
//           <span>›</span>
//           <span>Detail User {params.userId}</span>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
//           <div style={{ width: 24, height: 24, backgroundColor: "#3b82f6", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
//             <span style={{ color: "white", fontSize: 14 }}>📅</span>
//           </div>
//           <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: "#1e293b" }}>
//             Attendance Management
//           </h2>
//         </div>
//       </div>

//       {/* Search and Filter Section */}
//       <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
//         {/* Search Bar */}
//         <div style={{ position: "relative", flex: 1, minWidth: 300 }}>
//           <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</div>
//           <input
//             type="text"
//             placeholder="Simplify Your Search..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             style={{ width: "100%", padding: "12px 12px 12px 40px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, outline: "none" }}
//           />
//         </div>
//         {/* Download Button */}
//         <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
//           <span>📊</span>
//           Download
//         </button>
//       </div>

//       {/* Records Count */}
//       <div style={{ marginBottom: 16 }}>
//         <p style={{ margin: 0, color: "#6b7280", fontSize: 14 }}>
//           Total {filteredData.length} records
//         </p>
//       </div>

//       {/* Detail Table */}
//       {loading ? (
//         <div style={{ textAlign: "center", padding: 40 }}>
//           <p>Loading user attendance data...</p>
//         </div>
//       ) : filteredData.length > 0 ? (
//         <div style={{ backgroundColor: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#f9fafb" }}>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>USER</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>DATE</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>DEPARTMENT</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>CHECK IN</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>STATUS CHECK-IN</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>CHECK OUT</th>
//                 <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>STATUS CHECK-OUT</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((record, idx) => (
//                 <tr key={`${record.date}-${idx}`} style={{ borderBottom: "1px solid #f3f4f6" }}>
//                   <td style={{ padding: 16 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                       <div style={{ width: 32, height: 32, backgroundColor: "#e5e7eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                         <span style={{ fontSize: 12, color: "#6b7280" }}>👤</span>
//                       </div>
//                       <div>
//                         <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
//                           User {params.userId}
//                         </div>
//                         <div style={{ fontSize: 12, color: "#6b7280" }}>
//                           user.email
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{record.date}</td>
//                   <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>Department {params.userId}</td>
//                   <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{record.checkInTime}</td>
//                   <td style={{ padding: 16 }}>
//                     <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, backgroundColor: record.missingScan ? "#fef2f2" : "#f0fdf4", color: record.missingScan ? "#dc2626" : "#16a34a" }}>
//                       {record.missingScan ? "Miss check in" : "On time"}
//                     </span>
//                   </td>
//                   <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{record.checkOutTime}</td>
//                   <td style={{ padding: 16 }}>
//                     <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: 12, backgroundColor: record.missingScan ? "#fef2f2" : "#f0fdf4", color: record.missingScan ? "#dc2626" : "#16a34a" }}>
//                       {record.missingScan ? "Miss Check out" : "Complete"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div style={{ textAlign: "center", padding: 40 }}>
//           <p style={{ color: "#6b7280" }}>No detailed attendance data available for this user.</p>
//         </div>
//       )}
//     </div>
//   );
// } 
// app/dashboard/attendance/[userId]/page.tsx

import React from "react";

export default function UserAttendanceDetailPage({ params }: { params: { userId: string } }) {
  console.log("params:", params); // ✅ should now log { userId: '1001' } or similar

  return (
    <div>
      <h1>Attendance Details for User ID: {params.userId}</h1>
    </div>
  );
}

