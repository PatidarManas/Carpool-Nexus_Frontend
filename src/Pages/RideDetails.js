import { MapPin, Calendar, Clock, Car, Star, User, PawPrint, Cigarette, Users, AlertCircle, DollarSign, Route } from 'lucide-react'
import Navbar from '../Components/Navbar'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Components/Loading';
import Tiles from '../Components/Tiles';

export default function RideDetails({URL}) {
  const [ride,setRide] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    async function getDetails(){

      try {
        const response = await axios.get(`${URL}/rides/search/${id}`)
        setRide(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, [id])
  
  return !ride ? <Loading/> : (
    <div>
    <Navbar/>

    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
        <header className="px-4 sm:px-6 py-5 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-center text-green-800">Ride Details</h1>
        </header>
        <div className="space-y-6 px-4 sm:px-6 py-6">
          {/* Top Section: Travel Details */}
          <section className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Travel Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-4 md:col-span-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Date</p>
                      <p>{new Date(ride.when).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Time</p>
                      <p>{new Date(ride.when).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Distance</p>
                      <p>53.4 Km</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Price</p>
                      <p>Rs{ride.basePrice} per seat</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-inner">
                  <div className="flex items-center mb-2">
                    <Route className="mr-2 text-green-600 flex-shrink-0" />
                    <h3 className="font-semibold">Route Details</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">From</span>
                      <p className="mt-1">{ride.from.description}</p>
                    </div>
                    <Car className="text-green-600 mx-4 flex-shrink-0" />
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full">To</span>
                      <p className="mt-1">{ride.to.description}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Additional Information</h3>
                  <p className="text-sm text-gray-600">
                    This carpool route includes a short stop at a rest area. The driver prefers to take the scenic route, which may add 10 minutes to the journey but offers beautiful views.
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg aspect-square relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <Tiles start={[ride.from.location.lng, ride.from.location.lat]} end={[ride.to.location.lng, ride.to.location.lat]} setPath={()=>{}}/>
                </div>
                <img src="/placeholder.svg?height=300&width=300" alt="Route map" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* Rider Section */}
          <section className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Rider Information</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                <img src="/placeholder.svg?height=64&width=64" alt={ride.createdBy.name[0]} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-medium">{ride.createdBy.name}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`${i < ride.createdBy.rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{ride.createdBy.rating}</span>
                </div>
                <p className="text-sm text-gray-600">Contact: {ride.createdBy.email}</p>
              </div>
            </div>
          </section>

          {/* Availability Section */}
          <section className="bg-green-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ride Availability</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <PawPrint className="mr-2 text-green-600 flex-shrink-0" />
                <span>Pets Allowed: {ride.petsAllowed ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center">
                <Cigarette className="mr-2 text-green-600 flex-shrink-0" />
                <span>Smoking Allowed: {ride.smokingAllowed ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 text-green-600 flex-shrink-0" />
                <span>Seats Available: {ride.availableSeats}</span>
              </div>
              <div className="flex items-center">
                <Car className="mr-2 text-green-600 flex-shrink-0" />
                <span>Car Type: {ride.carType}</span>
              </div>
            </div>
          </section>

          {/* Booking Information Section */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Booking Information</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    This ride will be automatically booked upon your request. The driver will receive a notification and can
                    confirm within 2 hours. If not confirmed, your booking will be canceled, and you'll be notified.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Button Section */}
          <div className="bg-green-50 p-4 rounded-lg shadow-sm">
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg text-lg font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
              Book Ride
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>)
  
}