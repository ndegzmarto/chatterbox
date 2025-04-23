"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Chat({ selectedHistory }) {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);  // Array of messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  // Load history if selected
  useEffect(() => {
    if (selectedHistory) {
      setConversation([{ role: "user", content: selectedHistory.question }, { role: "assistant", content: selectedHistory.answer }]);
    } else {
      setConversation([]); // Clear conversation on new selection
    }
  }, [selectedHistory]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question };
    setConversation(prev => [...prev, userMessage]); // Add user message immediately
    setQuestion("");
    setLoading(true);
    setError(null);

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
      const aiMessage = { role: "assistant", content: data.answer };
      setConversation(prev => [...prev, aiMessage]); // Add AI response
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Display Area */}
      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-2">
        {conversation.map((msg, index) => (

        <div
          key={index}
          className={`flex w-full ${msg.role == 'assistant' ? 'justify-start' : 'justify-end'}`}
        >
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === 'assistant' ? 'bg-gray-700 text-left' : 'bg-blue-600 text-right'
              } w-fit max-w-2/3`}
            >
                <ReactMarkdown
                  children={msg.content}
                  remarkPlugins={[remarkGfm]}
                />
            </div>
          </div>
        ))}
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
            {loading ? "Sending.." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}


