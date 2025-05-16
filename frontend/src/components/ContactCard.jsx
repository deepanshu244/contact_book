import React from "react";

function ContactCard({ id, name, number, address, onDelete, onEdit }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-lg">{name}</h4>
        <p className="text-sm text-gray-600">{number}</p>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
      <div className="flex space-x-2 ml-4">
        <button
          className="text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
          title="Edit"
          onClick={() => onEdit({ id, name, number, address })}
        >
          ✎
        </button>
        <button
          className="text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors cursor-pointer"
          title="Delete"
          onClick={() => onDelete(id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default ContactCard;
