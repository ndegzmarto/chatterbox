// components/HistoryItem.js
export default function HistoryItem({ item, onClick }) {
    return (
        <button
            onClick={onClick}
            className="block w-full text-left py-1 px-4 rounded hover:bg-gray-700 text-sm"
        >
            {item.question}
        </button>
    );
}
