import React from 'react'

function Navbar() {
  return (
    <div className="bg-gray-800 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <div className="text-xl font-bold">Contact Book</div>
        <div className="text-xl font-bold hover:cursor-pointer">
          View Contacts
        </div>
      </div>
    </div>
  </div>
  )
}

export default Navbar
