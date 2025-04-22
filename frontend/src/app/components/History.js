"use client";

import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading history...</div>;
  if (history.length === 0) return <div className="p-4">No history yet.</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Query History</h2>
      <ul className="space-y-2">
        {history.map((item) => (
          <li key={item.id} className="bg-gray-700 rounded p-3">
            <div className="text-gray-300">
              <strong>Q:</strong> {item.question}
            </div>
            <div className="text-gray-400 mt-1">
              <strong>A:</strong> {item.answer}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(item.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

