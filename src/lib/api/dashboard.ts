const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardData() {
    const token = localStorage.getItem('token');    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(`${API_URL}/api/dashboard/overview`, {
      headers,
    });

  if (!res.ok) {
    throw new Error('Failed to fetch dashboard data');
  }

  return res.json();
}