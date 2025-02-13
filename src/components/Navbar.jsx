import React from 'react'

export default function Navbar() {
    return (
        <nav className="nav-bar text-white py-4 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className='block md:block'><img src="public/Frame1618871078.svg" alt="" /></div>
    
            {/* Navigation Links */}
            <ul className=" nav-ul flex justify-center text-center space-x-6">
              <li>
                <a href="#" className="hover:text-gray-300">Event</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">My Ticket</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">Project</a>
              </li>
            </ul>
            <div><button className='tickets-btn'>My Tickets </button></div>
          </div>
        </nav>
      );
}
