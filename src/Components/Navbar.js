import React, { useState } from 'react'
import { Bell, Car, Calendar, LogOut, MapPin, Search, Settings, Star, User, Users, Edit, PlayCircle, ChevronRight } from 'lucide-react';
import logo from "../assets/logo.png"
const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div><nav className=" bg-white shadow-lg px-40">
    <div className="container mx-auto px-4">
      <div className="flex justify-between  py-0 h-full">
        <div className="flex items-center space-x-4">
          <img src={logo} className='w-20'></img>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-green-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Rides
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
        <div className="flex items-center space-x-4">
          <button
            className="relative p-2 rounded-full hover:bg-gray-100"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="relative">
            <button className="relative p-0">
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  {showNotifications && (
        <div className="fixed top-20 right-12 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-lg shadow-2xl z-50">
          <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-green-700">Notifications</h3>
          </div>
          <ul className="space-y-4 p-4">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="group">
                <div className="flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-green-50">
                  <div className="bg-green-100 rounded-full p-1 group-hover:bg-green-200 transition-colors duration-200">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium group-hover:text-green-700 transition-colors duration-200">New ride request from Alex</p>
                    <p className="text-sm text-gray-500">10 minutes ago</p>
                  </div>
                </div>
                {index < 4 && <hr className="my-2 border-gray-200" />}
              </li>
            ))}
          </ul>
        </div>
      )}
  </div>
  )
}

export default Navbar