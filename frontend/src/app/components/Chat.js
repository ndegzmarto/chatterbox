"use client";

import { useState, useEffect } from "react";

export default function Chat({ selectedHistory }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(selectedHistory ? selectedHistory.answer : null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
    if (selectedHistory) {
      setQuestion(selectedHistory.question);
      setAnswer(selectedHistory.answer);
    }
  }, [selectedHistory]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const res = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Error submitting question");
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Display Area */}
      <div className="flex-1 p-4 overflow-y-auto">
      {selectedHistory && (
          <div className="bg-gray-700 p-3 rounded mb-2">
            <h3 className="font-semibold mb-1">Question:</h3>
            <p>{selectedHistory.question}</p>
            <h3 className="font-semibold mb-1">Answer:</h3>
            <p>{selectedHistory.answer}</p>
          </div>
        )}
        {answer && !selectedHistory && (
          <div className="bg-gray-700 p-3 rounded mb-2">
            <h3 className="font-semibold mb-1">Answer:</h3>
            <p>{answer}</p>
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-700 text-white border rounded mr-2"
            placeholder="How can I help you today?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}


