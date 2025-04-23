"use client";

import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function Home() {
  const [tab, setTab] = useState("chat");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  // Load history from API on component mount
  useEffect(() => {
    fetch('http://localhost:8000/api/history')
      .then(res => res.json())
      .then((data) => { 
         const sortedHistory = [...data].sort(
        (a, b) => b - a
      );
       setConversationHistory(sortedHistory);
    })
       
  }, []);

  function handleNewConversation() {
    setSelectedHistory(null); // Clear the selected history
    setTab("chat"); // Switch to chat tab if necessary
  }

  function handleSidebarToggle() {
    setSidebarVisible(!sidebarVisible);
  }
  
  function handleHistoryClick(item) {
    setSelectedHistory(item);
    setTab('chat');
  }
  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Sidebar Toggle Button */}
      <button
        onClick={handleSidebarToggle}
        className="p-2 bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none"
      >
        {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 p-4 transition-all ${
          sidebarVisible ? "block" : "hidden"
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">ChatterBox AI</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
                onClick={handleNewConversation}
              >
                New conversation
              </button>
              <div className="text-gray-500 mt-2">
                {conversationHistory.map((item) => (
                  <button
                    key={item.id}
                    className="block w-full text-left py-1 px-4 rounded hover:bg-gray-700 text-sm"
                    onClick={() => handleHistoryClick(item)}
                    >
                    {item.question}
                  <span className="block text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleString()}
                  </span>
                  </button>
                ))}
               
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4">
          {tab === "chat" && <Chat selectedHistory={selectedHistory} />}
      </div>
    </div>
  );
}


