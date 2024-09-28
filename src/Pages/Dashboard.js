import React, { useState, useRef, useEffect } from 'react';
import { Bell, Car, Calendar, LogOut, MapPin, Search, Settings, Star, User, Users, Edit, PlayCircle, ChevronRight } from 'lucide-react';
import Navbar from '../Components/Navbar';

const placeSuggestions = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "Philadelphia, PA",
  "San Antonio, TX",
  "San Diego, CA",
  "Dallas, TX",
  "San Jose, CA",
];

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const filteredFromSuggestions = placeSuggestions.filter(place =>
    place.toLowerCase().includes(fromValue.toLowerCase())
  );

  const filteredToSuggestions = placeSuggestions.filter(place =>
    place.toLowerCase().includes(toValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromInputRef.current && !fromInputRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toInputRef.current && !toInputRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFromSelect = (place) => {
    setFromValue(place);
    setShowFromSuggestions(false);
    toInputRef.current?.focus();
  };

  const handleToSelect = (place) => {
    setToValue(place);
    setShowToSuggestions(false);
    dateInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <Navbar/>

      <main className="container mx-auto mt-0 px-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome Manas,</h1>
          <p className="text-xl text-green-600">Reduce Your Carbon Footprint, One Ride at a Time</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-12">
          <h2 className="text-2xl text-green-700 mb-4">Find a Ride</h2>
          <form className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                ref={fromInputRef}
                placeholder="From"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={fromValue}
                onChange={(e) => {
                  setFromValue(e.target.value);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => setShowFromSuggestions(true)}
              />
              {showFromSuggestions && filteredFromSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredFromSuggestions.map((place, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer flex justify-between items-center group"
                      onClick={() => handleFromSelect(place)}
                    >
                      <span>{place}</span>
                      <ChevronRight className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                ref={toInputRef}
                placeholder="To"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={toValue}
                onChange={(e) => {
                  setToValue(e.target.value);
                  setShowToSuggestions(true);
                }}
                onFocus={() => setShowToSuggestions(true)}
              />
              {showToSuggestions && filteredToSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                  {filteredToSuggestions.map((place, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer flex justify-between items-center group"
                      onClick={() => handleToSelect(place)}
                    >
                      <span>{place}</span>
                      <ChevronRight className="h-4 w-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative flex-1">
              <Calendar className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                ref={dateInputRef}
                type="datetime-local"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="relative flex-1">
              <Users className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                placeholder="Passengers"
                min="1"
                max="10"
                className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" /> Search
            </button>
          </form>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-green-800">Your Rides</h2>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <Car className="mr-2 h-5 w-5" /> Create New Ride
          </button>
        </div>

        <div className="space-y-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-700">Upcoming Ride</h3>
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">Departing in 1 hour</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-gray-400" /> From: Vadodara, Gujrat</p>
                <p className="flex items-center"><MapPin className="mr-2 h-4 w-4 text-gray-400" /> To: Mumbai, Maharastra</p>
              </div>
              <div className="space-y-2">
                <p className="flex items-center"><Calendar className="mr-2 h-4 w-4 text-gray-400" /> Date: 2023-06-20 14:00</p>
                <p className="flex items-center"><Users className="mr-2 h-4 w-4 text-gray-400" /> Passengers: 3</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="text-green-600 border border-green-600 hover:bg-green-50 px-4 py-2 rounded-md flex items-center">
                <Edit className="mr-2 h-4 w-4" /> Edit Ride
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
                <PlayCircle className="mr-2 h-4 w-4" /> Start Ride
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-700">Pending Rating</h3>
              <button className="text-green-600 border border-green-600 hover:bg-green-50 px-4 py-2 rounded-md flex items-center">
                <Star className="mr-2 h-4 w-4" /> Rate Now
              </button>
            </div>
            <p className="mb-2">Ride with John Doe</p>
            <p className="text-sm text-gray-600">Date: 2023-06-15</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-green-700">Recent Rating Received</h3>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="text-yellow-400 h-5 w-5 fill-current" />
                ))}
                <Star className="text-gray-300 h-5 w-5" />
                <span className="ml-2 text-sm text-gray-600">(4.0)</span>
              </div>
            </div>
            <p className="mb-2">Ride with Jane Smith</p>
            <p className="text-sm text-gray-600">Date: 2023-06-10</p>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Dashboard;