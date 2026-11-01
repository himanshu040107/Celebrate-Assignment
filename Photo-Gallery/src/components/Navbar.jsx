import React from 'react'

const Navbar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="h-6 bg-white flex items-center justify-between border-1 border-[#e4e4df] rounded p-8 ">
        <h1 className="text-3xl font-bold text-[#58684c] font-mono">Photo Gallery</h1>
        <input type="search" value={searchTerm} onChange={onSearchChange} placeholder="Search by author..." aria-label="Search photos by author" className="border border-gray-300 rounded-md py-1 px-2 outline-none font-mono" />
    </div>
  )
}

export default Navbar
