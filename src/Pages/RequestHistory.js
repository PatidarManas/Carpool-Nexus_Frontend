import React, { useState } from 'react'
import { Search, MapPin, Users, Bell, Calendar, Clock } from 'lucide-react'
import Navbar from '../Components/Navbar'

const statusColors = {
  pending: 'bg-yellow-200 text-yellow-800',
  approved: 'bg-green-200 text-green-800',
  'auto-approved': 'bg-blue-200 text-blue-800',
  rejected: 'bg-red-200 text-red-800',
  cancelled: 'bg-gray-200 text-gray-800',
}

export default function RequestHistory() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [requests, setRequests] = useState([
    {
      id: '1',
      date: '2023-06-20',
      time: '10:30 AM',
      from: '123 Main St, City A',
      to: '456 Oak St, City B',
      riderName: 'John Doe',
      riderImage: '/placeholder.svg?height=40&width=40',
      seats: 2,
      status: 'pending',
      hasUnreadMessage: true,
      requestedAt: '2023-06-15T09:00:00Z',
      statusUpdatedAt: null,
    },
    {
      id: '2',
      date: '2023-06-22',
      time: '2:00 PM',
      from: '789 Pine St, City C',
      to: '101 Elm St, City D',
      riderName: 'Jane Smith',
      riderImage: '/placeholder.svg?height=40&width=40',
      seats: 1,
      status: 'approved',
      hasUnreadMessage: false,
      requestedAt: '2023-06-16T14:30:00Z',
      statusUpdatedAt: '2023-06-17T10:15:00Z',
    },
    {
      id: '3',
      date: '2023-06-25',
      time: '8:45 AM',
      from: '202 Maple Ave, City E',
      to: '303 Birch Rd, City F',
      riderName: 'Alice Johnson',
      riderImage: '/placeholder.svg?height=40&width=40',
      seats: 3,
      status: 'auto-approved',
      hasUnreadMessage: false,
      requestedAt: '2023-06-18T18:00:00Z',
      statusUpdatedAt: '2023-06-18T18:01:00Z',
    },
    {
      id: '4',
      date: '2023-06-28',
      time: '11:15 AM',
      from: '404 Cedar Ln, City G',
      to: '505 Walnut Blvd, City H',
      riderName: 'Bob Williams',
      riderImage: '/placeholder.svg?height=40&width=40',
      seats: 2,
      status: 'rejected',
      hasUnreadMessage: true,
      requestedAt: '2023-06-20T08:45:00Z',
      statusUpdatedAt: '2023-06-21T12:30:00Z',
    },
  ])

  const filteredRequests = requests.filter(request => 
    (filter === 'all' || request.status === filter) &&
    (request.riderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
     request.to.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleCancel = (id) => {
    setRequests(requests.map(request => 
      request.id === id ? { ...request, status: 'cancelled', statusUpdatedAt: new Date().toISOString() } : request
    ))
  }

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Request History</h1>
        
        <div className="mb-6 flex items-center bg-white rounded-lg shadow-md p-2">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by rider name or location..."
            className="flex-grow outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="ml-2 p-2 border rounded"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="auto-approved">Auto-approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-semibold">{request.date} at {request.time}</p>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin size={16} className="mr-1" />
                    <span>{request.from} to {request.to}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[request.status]}`}>
                  {request.status}
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <img src={request.riderImage} alt={request.riderName} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-medium">{request.riderName}</p>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Users size={16} className="mr-1" />
                      {request.seats} seat(s)
                    </p>
                  </div>
                </div>
                {request.hasUnreadMessage && (
                  <div className="bg-red-500 text-white rounded-full p-2">
                    <Bell size={16} />
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <p className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Requested: {new Date(request.requestedAt).toLocaleString()}
                </p>
                {request.statusUpdatedAt && (
                  <p className="flex items-center mt-1">
                    <Clock size={16} className="mr-1" />
                    Status Updated: {new Date(request.statusUpdatedAt).toLocaleString()}
                  </p>
                )}
              </div>
              {request.status === 'pending' && (
                <button
                  onClick={() => handleCancel(request.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}