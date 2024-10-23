import React, { useState, useEffect } from "react";
import {
  BellIcon,
  CarIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  ZapIcon,
  CheckCircleIcon,
  UsersIcon,
  CigaretteIcon,
  PawPrintIcon,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import axios from 'axios';

const initialRides = [
  // Sample initial ride data, which can be replaced with actual data
  {
    id: 1,
    driver: "John Doe",
    departure: "New York",
    destination: "Boston",
    time: "2023-10-10 08:00",
    price: 25,
    seatsAvailable: 2,
    verified: true,
    instantApproval: false,
    smokingAllowed: false,
    petAllowed: true,
  },
  {
    id: 2,
    driver: "Jane Smith",
    departure: "San Francisco",
    destination: "Los Angeles",
    time: "2023-10-10 10:00",
    price: 50,
    seatsAvailable: 3,
    verified: false,
    instantApproval: true,
    smokingAllowed: true,
    petAllowed: false,
  },
  // More rides...
];

export default function SearchRide({URL}) {
  const [searchResults, setSearchResults] = useState(initialRides);
  const [sortOptions, setSortOptions] = useState({
    earliestDeparture: false,
    lowestPrice: false,
    closeToDeparturePoint: false,
    closeToArrivalPoint: false,
    shortestRide: false,
  });
  const [departureTimeFilters, setDepartureTimeFilters] = useState({
    before6: false,
    "6to12": false,
    "12to18": false,
    after18: false,
  });
  const [additionalFilters, setAdditionalFilters] = useState({
    verifiedOnly: false,
    instantApproval: false,
    smokingAllowed: false,
    petAllowed: false,
  });

  // New state for location suggestions and coordinates
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromCoordinates, setFromCoordinates] = useState(null);
  const [toCoordinates, setToCoordinates] = useState(null);
  const [passengers, setPassengers] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  useEffect(() => {
    // applyFiltersAndSort();
  }, [sortOptions, departureTimeFilters, additionalFilters]);

  const handleSearch = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`${URL}/rides/search`,{fromCoordinates, toCoordinates, dateTime, passengers});
      setSearchResults(response.data.rides)
    } catch (error) {
      
      console.log(error);
    }
  };

  const applyFiltersAndSort = () => {
    let filteredResults = [...initialRides];

    // Filter by departure time
    filteredResults = filteredResults.filter((ride) => {
      const rideTime = new Date(ride.time).getHours();
      if (departureTimeFilters.before6 && rideTime < 6) return true;
      if (departureTimeFilters["6to12"] && rideTime >= 6 && rideTime < 12) return true;
      if (departureTimeFilters["12to18"] && rideTime >= 12 && rideTime < 18) return true;
      if (departureTimeFilters.after18 && rideTime >= 18) return true;
      return false;
    });

    // Additional filters
    filteredResults = filteredResults.filter((ride) => {
      if (additionalFilters.verifiedOnly && !ride.verified) return false;
      if (additionalFilters.instantApproval && !ride.instantApproval) return false;
      if (additionalFilters.smokingAllowed && !ride.smokingAllowed) return false;
      if (additionalFilters.petAllowed && !ride.petAllowed) return false;
      return true;
    });

    // Sort options
    if (sortOptions.earliestDeparture) {
      filteredResults.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
    if (sortOptions.lowestPrice) {
      filteredResults.sort((a, b) => a.price - b.price);
    }

    // Apply other sorts like 'closeToDeparturePoint', 'closeToArrivalPoint', etc., if needed
    setSearchResults(filteredResults);
  };

  // Function to fetch location suggestions
  const fetchLocationSuggestions = async (input, setSuggestions) => {
    if (input.length < 3) return; // Minimum characters before suggesting
    try {
      const response = await axios.get(`${URL}/places/suggestions/${input}`);
      const { suggestions } = response.data;
      setSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  // Handle input change for 'from' field and fetch suggestions
  const handleFromChange = (e) => {
    setFromInput(e.target.value);
    fetchLocationSuggestions(e.target.value, setFromSuggestions);
  };

  // Handle input change for 'to' field and fetch suggestions
  const handleToChange = (e) => {
    setToInput(e.target.value);
    fetchLocationSuggestions(e.target.value, setToSuggestions);
  };

  // Function to handle suggestion selection
  const selectSuggestion = (location, setInput, setCoordinates, setSuggestions) => {
    setInput(location.description);
    setCoordinates(location.geometry.location);
    setSuggestions([]); // Hide suggestions after selection
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-green-800">Find a Ride</h1>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Create Ride
            </button>
          </div>
          <form className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <input
                  id="from"
                  name="from"
                  type="text"
                  placeholder="City or location"
                  value={fromInput}
                  onChange={handleFromChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                {fromSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md rounded-lg mt-1">
                    {fromSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                        onClick={() =>
                          selectSuggestion(suggestion, setFromInput, setFromCoordinates, setFromSuggestions)
                        }
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="relative">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="text"
                  placeholder="City or location"
                  value={toInput}
                  onChange={handleToChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
                {toSuggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-md rounded-lg mt-1">
                    {toSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                        onClick={() =>
                          selectSuggestion(suggestion, setToInput, setToCoordinates, setToSuggestions)
                        }
                      >
                        {suggestion.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label htmlFor="when" className="block text-sm font-medium text-gray-700 mb-1">
                  When
                </label>
                <input
                  onChange={(e)=>{setDateTime(e.target.value)}}
                  id="when"
                  name="when"
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
                  Passengers
                </label>
                <input
                  onChange={(e)=>{setPassengers(e.target.value)}}
                  id="passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
              onClick={handleSearch}
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Search
              </button>
            </div>
          </form>

          {/* Search results section */}
          <div>
            {searchResults.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((ride) => (
                  <li key={ride.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{ride.driver}</h3>
                      <p className="text-sm text-gray-500">
                        {ride.departure} to {ride.destination}
                      </p>
                      <p className="text-sm text-gray-500">{ride.time}</p>
                      <p className="text-sm text-gray-500">
                        Seats available: {ride.seatsAvailable} • Price: ${ride.price}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <CheckCircleIcon
                        className={`w-6 h-6 ${ride.verified ? "text-green-600" : "text-gray-400"}`}
                        title={ride.verified ? "Verified driver" : "Unverified driver"}
                      />
                      <UsersIcon
                        className={`w-6 h-6 ${ride.instantApproval ? "text-green-600" : "text-gray-400"}`}
                        title={ride.instantApproval ? "Instant approval" : "Requires approval"}
                      />
                      <CigaretteIcon
                        className={`w-6 h-6 ${ride.smokingAllowed ? "text-green-600" : "text-gray-400"}`}
                        title={ride.smokingAllowed ? "Smoking allowed" : "No smoking"}
                      />
                      <PawPrintIcon
                        className={`w-6 h-6 ${ride.petAllowed ? "text-green-600" : "text-gray-400"}`}
                        title={ride.petAllowed ? "Pets allowed" : "No pets"}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No rides found. Please adjust your search filters.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
