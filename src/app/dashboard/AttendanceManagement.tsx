import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import AttendanceDetail from "./attendance/AttendanceDetail"; // No longer needed

interface ApiResponse<T> {
  success: boolean;
  message: string;
  payload: T;
  timestamp: string;
}

interface AttendanceLedgerDto {
  content: Array<{
    employeeId: number;
    employeeName: string;
    departmentName?: string;
    totalLate: number;
    totalLateHours: number;
    totalMissingScan: number;
    email?: string;
    workHours?: string;
    remarks?: string;
  }>;
  totalPages: number;
  totalElements: number;
  number: number; // current page index
  size: number;   // page size
}

interface AttendanceDetail {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  lateDuration: string;
  missingScan: boolean;
}

interface AttendanceListResponseDto {
  content: AttendanceDetail[];
  totalPages: number;
  number: number;
  size: number;
}

const API_BASE = "https://wehr.kosign.dev/api/new/manager/admin/attendances";

// Mock data for testing
const mockLedgerData: AttendanceLedgerDto = {
  content: [
    {
      employeeId: 1001,
      employeeName: "User 1",
      email: "user.email",
      departmentName: "Department 1",
      totalLate: 29,
      totalLateHours: 0.05,
      totalMissingScan: 5,
      workHours: "08:00-05:00",
      remarks: ""
    },
    {
      employeeId: 1002,
      employeeName: "User 2",
      email: "user.email",
      departmentName: "Department 2",
      totalLate: 29,
      totalLateHours: 0.05,
      totalMissingScan: 5,
      workHours: "08:00-05:00",
      remarks: ""
    },
    {
      employeeId: 1003,
      employeeName: "User 3",
      email: "user.email",
      departmentName: "Department 3",
      totalLate: 29,
      totalLateHours: 0.05,
      totalMissingScan: 5,
      workHours: "08:00-05:00",
      remarks: ""
    },
    {
      employeeId: 1004,
      employeeName: "User 4",
      email: "user.email",
      departmentName: "Department 4",
      totalLate: 29,
      totalLateHours: 0.05,
      totalMissingScan: 5,
      workHours: "08:00-05:00",
      remarks: ""
    },
    {
      employeeId: 1005,
      employeeName: "User 5",
      email: "user.email",
      departmentName: "Department 5",
      totalLate: 29,
      totalLateHours: 0.05,
      totalMissingScan: 5,
      workHours: "08:00-05:00",
      remarks: ""
    }
  ],
  totalPages: 1,
  totalElements: 5,
  number: 0,
  size: 25
};

const mockUserAttendanceData: AttendanceListResponseDto = {
  content: [
    {
      date: "01/08/2024",
      checkInTime: "07:25:00 AM",
      checkOutTime: "04:11:21 PM",
      lateDuration: "0 minutes",
      missingScan: false
    },
    {
      date: "01/09/2024",
      checkInTime: "08:15:00 AM",
      checkOutTime: "05:30:00 PM",
      lateDuration: "15 minutes",
      missingScan: true
    },
    {
      date: "01/10/2024",
      checkInTime: "07:45:00 AM",
      checkOutTime: "04:45:00 PM",
      lateDuration: "0 minutes",
      missingScan: false
    },
    {
      date: "01/11/2024",
      checkInTime: "08:30:00 AM",
      checkOutTime: "05:15:00 PM",
      lateDuration: "30 minutes",
      missingScan: true
    },
    {
      date: "01/12/2024",
      checkInTime: "07:20:00 AM",
      checkOutTime: "04:20:00 PM",
      lateDuration: "0 minutes",
      missingScan: false
    }
  ],
  totalPages: 1,
  number: 0,
  size: 25
};

export default function AttendanceManagement() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState({
    startDate: "2025-01-21",
    endDate: "2025-01-28",
  });

  // Ledger state
  const [ledgerData, setLedgerData] = useState<AttendanceLedgerDto | null>(null);
  const [ledgerPage, setLedgerPage] = useState(0);
  const ledgerSize = 25;
  const [loadingLedger, setLoadingLedger] = useState(false);

  // User attendance details state
  // Remove selectedUserId, userAttendanceData, loadingUserAttendance
  // const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // const [userType, setUserType] = useState("ALL");
  // const [userAttendanceData, setUserAttendanceData] = useState<AttendanceListResponseDto | null>(null);
  // const [loadingUserAttendance, setLoadingUserAttendance] = useState(false);

  // Mock data toggle
  const [useMockData, setUseMockData] = useState(true);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Attendance Ledger
  useEffect(() => {
    async function fetchLedger() {
      setLoadingLedger(true);
      try {
        if (useMockData) {
          // Use mock data
          setTimeout(() => {
            setLedgerData(mockLedgerData);
            setLoadingLedger(false);
          }, 500);
          return;
        }

        const params = new URLSearchParams({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          page: ledgerPage.toString(),
          size: ledgerSize.toString(),
          sortDirection: "DESC",
          lateThreshold: "IMMEDIATE",
        });
        const res = await fetch(`${API_BASE}/ledger?${params.toString()}`);
        const json: ApiResponse<AttendanceLedgerDto> = await res.json();
        if (json.success) {
          setLedgerData(json.payload);
        } else {
          alert("Error loading attendance ledger: " + json.message);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        alert("Failed to fetch ledger: " + errorMessage);
      } finally {
        setLoadingLedger(false);
      }
    }
    fetchLedger();
  }, [dateRange, ledgerPage, useMockData]);

  // Fetch User Attendance Details
  // useEffect(() => {
  //   if (!selectedUserId) {
  //     setUserAttendanceData(null);
  //     return;
  //   }

  //   async function fetchUserAttendance() {
  //     setLoadingUserAttendance(true);
  //     try {
  //       if (useMockData) {
  //         // Use mock data
  //         setTimeout(() => {
  //           setUserAttendanceData(mockUserAttendanceData);
  //           setLoadingUserAttendance(false);
  //         }, 500);
  //         return;
  //       }

  //       const params = new URLSearchParams({
  //         startDate: dateRange.startDate,
  //         endDate: dateRange.endDate,
  //         page: "0",
  //         size: "50",
  //         sortDirection: "DESC",
  //         userId: selectedUserId!.toString(),
  //         type: userType,
  //       });
  //       const url = `${API_BASE}/userAttendances/${selectedUserId}/type/${userType}?${params.toString()}`;
  //       const res = await fetch(url);
  //       const json: ApiResponse<AttendanceListResponseDto> = await res.json();
  //       if (json.success) {
  //         setUserAttendanceData(json.payload);
  //       } else {
  //         alert("Error loading user attendance: " + json.message);
  //       }
  //     } catch (err) {
  //       const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
  //       alert("Failed to fetch user attendance: " + errorMessage);
  //     } finally {
  //       setLoadingUserAttendance(false);
  //     }
  //   }
  //   fetchUserAttendance();
  // }, [selectedUserId, dateRange, userType, useMockData]);

  // Filter data based on search term
  const filteredData = ledgerData?.content.filter(emp => 
    emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Format date range for display
  const formatDateRange = () => {
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <div style={{ 
            width: "24px", 
            height: "24px", 
            backgroundColor: "#3b82f6", 
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "12px"
          }}>
            <span style={{ color: "white", fontSize: "14px" }}>📅</span>
          </div>
          <h1 style={{ 
            margin: 0, 
            fontSize: "24px", 
            fontWeight: "600", 
            color: "#1e293b" 
          }}>
            Attendance Management
          </h1>
        </div>
        <p style={{ 
          margin: 0, 
          color: "#64748b", 
          fontSize: "14px" 
        }}>
          The Total Leave feature ensures comprehensive tracking of all employee leave records.
        </p>
      </div>

      {/* Mock data toggle and test button */}
      <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f0f8ff", border: "1px solid #3b82f6", borderRadius: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", fontSize: "14px" }}>
            <input
              type="checkbox"
              checked={useMockData}
              onChange={(e) => setUseMockData(e.target.checked)}
              style={{ marginRight: "8px" }}
            />
            Use Mock Data (for testing)
          </label>
          
          {/* Test Modal Button */}
          <button 
            onClick={() => {
              console.log("Test button clicked");
              // setSelectedUserId(1001); // No longer needed
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer"
            }}
          >
            🧪 Test Modal
          </button>
        </div>
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#666" }}>
          Debug: selectedUserId = {/* No longer needed */}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div style={{ 
        display: "flex", 
        gap: "16px", 
        marginBottom: "24px",
        flexWrap: "wrap",
        alignItems: "center"
      }}>
        {/* Search Bar */}
        <div style={{ 
          position: "relative", 
          flex: "1", 
          minWidth: "300px" 
        }}>
          <div style={{ 
            position: "absolute", 
            left: "12px", 
            top: "50%", 
            transform: "translateY(-50%)",
            color: "#9ca3af"
          }}>
            🔍
          </div>
          <input
            type="text"
            placeholder="Simplify Your Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 12px 12px 40px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none"
            }}
          />
        </div>

        {/* Date Range Selector */}
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          gap: "8px",
          padding: "12px 16px",
          border: "1px solid #d1d5db",
          borderRadius: "8px",
          backgroundColor: "white",
          cursor: "pointer"
        }}>
          <span style={{ color: "#6b7280" }}>📅</span>
          <span style={{ fontSize: "14px", color: "#374151" }}>
            {formatDateRange()}
          </span>
        </div>

        {/* Download Button */}
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
          cursor: "pointer"
        }}>
          <span>📊</span>
          Download
        </button>
      </div>

      {/* Data Table */}
      {loadingLedger ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>Loading attendance data...</p>
        </div>
      ) : ledgerData && filteredData.length > 0 ? (
        <>
          {/* Records Count */}
          <div style={{ marginBottom: "16px" }}>
            <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
              Total {filteredData.length} records
            </p>
          </div>

          {/* Table */}
          <div style={{
            backgroundColor: "white",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>USER</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>Work-Hour</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>Total Late After Work Hour(00:00)</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>Total Late in (In hour)</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>Total Missing Scan</th>
                  <th style={{ padding: "16px", textAlign: "left", fontSize: "14px", fontWeight: "600", color: "#374151", borderBottom: "1px solid #e5e7eb" }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((emp) => (
                  <tr
                    key={emp.employeeId}
                    style={{ 
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f4f6",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    onClick={() => {
                      router.push(`/dashboard/attendance/${emp.employeeId}`);
                    }}
                  >
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#e5e7eb",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <span style={{ fontSize: "12px", color: "#6b7280" }}>👤</span>
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                            {emp.employeeName}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>
                            {emp.email || "user@email.com"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: "#374151" }}>
                      {emp.workHours || "08:00-05:00"}
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: "#374151" }}>
                      {emp.totalLate}
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: "#374151" }}>
                      {emp.totalLateHours.toFixed(2)}
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: "#374151" }}>
                      {emp.totalMissingScan}
                    </td>
                    <td style={{ padding: "16px", fontSize: "14px", color: "#6b7280" }}>
                      {emp.remarks || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            gap: "16px", 
            marginTop: "24px" 
          }}>
            <button
              disabled={ledgerPage === 0}
              onClick={() => setLedgerPage((p) => Math.max(0, p - 1))}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                borderRadius: "6px",
                cursor: ledgerPage === 0 ? "not-allowed" : "pointer",
                opacity: ledgerPage === 0 ? 0.5 : 1
              }}
            >
              ←
            </button>
            
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setLedgerPage(page - 1)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  backgroundColor: ledgerPage === page - 1 ? "#3b82f6" : "white",
                  color: ledgerPage === page - 1 ? "white" : "#374151",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                {page}
              </button>
            ))}
            
            <button
              disabled={ledgerPage + 1 >= (ledgerData?.totalPages || 1)}
              onClick={() => setLedgerPage((p) => p + 1)}
              style={{
                padding: "8px 12px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                borderRadius: "6px",
                cursor: ledgerPage + 1 >= (ledgerData?.totalPages || 1) ? "not-allowed" : "pointer",
                opacity: ledgerPage + 1 >= (ledgerData?.totalPages || 1) ? 0.5 : 1
              }}
            >
              →
            </button>
            
            <span style={{ fontSize: "14px", color: "#6b7280" }}>Items per page</span>
            <select 
              value={ledgerSize}
              onChange={(e) => console.log("Page size changed:", e.target.value)}
              style={{
                padding: "4px 8px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p style={{ color: "#6b7280" }}>No attendance data found.</p>
        </div>
      )}

      {/* User Detail Modal */}
      {/* Remove <AttendanceDetail ... /> */}
    </div>
  );
}
