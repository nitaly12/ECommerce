const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getStockData() {
  const res = await fetch(`${API_URL}/api/stock`);

  if (!res.ok) {
    throw new Error('Failed to fetch stock data');
  }

  return res.json();
}

export async function getStockCounts() {
  const res = await fetch(`${API_URL}/api/stock-items/count` , {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch stock counts');
  }

  return res.json();
}