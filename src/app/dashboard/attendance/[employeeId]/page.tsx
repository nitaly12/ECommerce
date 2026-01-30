"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Mock data generator
function generateMockAttendanceRecords({ page, size, startDate, endDate }: { page: number; size: number; startDate: string; endDate: string }) {
  const totalRecords = 60;
  const startIdx = page * size;
  const endIdx = Math.min(startIdx + size, totalRecords);
  const content = [];
  for (let i = startIdx; i < endIdx; i++) {
    content.push({
      userName: "Employee Name",
      email: "employee@email.com",
      date: "01/08/2024",
      department: "Department 1",
      checkIn: "07:25:00 AM",
      statusCheckIn: "Miss check in",
      checkOut: "04:11:21 PM",
      statusCheckOut: "Miss Check out"
    });
  }
  return {
    content,
    totalRecords
  };
}

export default function UserAttendanceDetailPage({ params }: { params: { employeeId: string } }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-21",
    endDate: "2024-01-28"
  });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  // Mock data
  const { content, totalRecords } = useMemo(() => generateMockAttendanceRecords({
    page,
    size: pageSize,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate
  }), [page, pageSize, dateRange]);

  // Filtered data (search)
  const filteredData = content.filter(row =>
    row.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Download CSV
  function downloadCSV() {
    if (!filteredData.length) return;
    const header = [
      "User Name", "Email", "Date", "Department", "Check In", "Status Check-In", "Check Out", "Status Check-Out"
    ];
    const rows = filteredData.map(row => [
      row.userName,
      row.email,
      row.date,
      row.department,
      row.checkIn,
      row.statusCheckIn,
      row.checkOut,
      row.statusCheckOut
    ]);
    const csvContent = [header, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_detail_${dateRange.startDate}_to_${dateRange.endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Pagination
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div style={{ padding: 24, background: "#fff", minHeight: "100vh" }}>
      <button
        onClick={() => router.push("/dashboard/attendance")}
        style={{
          marginBottom: 16,
          background: "none",
          border: "none",
          color: "#3b82f6",
          fontSize: 16,
          cursor: "pointer"
        }}
      >
        ← Back
      </button>
      {/* Breadcrumb */}
      <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
        Attendance Management &gt; <b>Detail Employee {params.employeeId}</b>
      </div>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ fontSize: 28, color: "#6366f1" }}>🗓️</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#6366f1", margin: 0 }}>Attendance Management</h1>
      </div>
      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Simplify Your Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: 12, border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 14 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={e => setDateRange(dr => ({ ...dr, startDate: e.target.value }))}
            style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14 }}
          />
          <span style={{ color: "#6b7280" }}>-</span>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={e => setDateRange(dr => ({ ...dr, endDate: e.target.value }))}
            style={{ padding: 8, border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 14 }}
          />
        </div>
        <button style={{ background: "#f1f5f9", border: "none", borderRadius: 6, padding: "8px 16px", color: "#6366f1", fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <span>🧰</span> Filter
        </button>
        <button onClick={downloadCSV} style={{ background: "#22c55e", border: "none", borderRadius: 6, padding: "8px 16px", color: "white", fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", gap: 6 }}>
          <span>📥</span> Download
        </button>
      </div>
      {/* Total records */}
      <div style={{ color: "#64748b", fontSize: 14, marginBottom: 8 }}>
        Total {totalRecords} records
      </div>
      {/* Table */}
      <div style={{ background: "#f8fafc", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px 0 rgba(0,0,0,0.05)", marginBottom: 16 }}>
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f1f5f9" }}>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>USER</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>DATE</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>DEPARTMENT</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>CHECK IN</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>STATUS CHECK-IN</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>CHECK OUT</th>
                <th style={{ padding: 16, textAlign: "left", fontSize: 14, fontWeight: 600, color: "#374151", borderBottom: "1px solid #e5e7eb" }}>STATUS CHECK-OUT</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, background: "#e5e7eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 14, color: "#6b7280" }}>👤</span>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{row.userName}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.date}</td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.department}</td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.checkIn}</td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.statusCheckIn}</td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.checkOut}</td>
                  <td style={{ padding: 16, fontSize: 14, color: "#374151" }}>{row.statusCheckOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
        <button
          disabled={page === 0}
          onClick={() => setPage(p => Math.max(0, p - 1))}
          style={{ padding: "8px 12px", border: "1px solid #d1d5db", background: "white", borderRadius: 6, cursor: page === 0 ? "not-allowed" : "pointer", opacity: page === 0 ? 0.5 : 1 }}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", background: page === p ? "#6366f1" : "white", color: page === p ? "white" : "#374151", borderRadius: 6, cursor: "pointer" }}
          >
            {p + 1}
          </button>
        ))}
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
          style={{ padding: "8px 12px", border: "1px solid #d1d5db", background: "white", borderRadius: 6, cursor: page + 1 >= totalPages ? "not-allowed" : "pointer", opacity: page + 1 >= totalPages ? 0.5 : 1 }}
        >
          &gt;
        </button>
        <span style={{ fontSize: 14, color: "#6b7280" }}>Items per page</span>
        <select
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(0); }}
          style={{ padding: "4px 8px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: 14 }}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}

