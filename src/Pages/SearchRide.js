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

const initialRides = [
  {
    id: 1,
    from: "New York",
    to: "Boston",
    departureTime: "2:00 PM",
    arrivalTime: "6:00 PM",
    date: "2023-06-25",
    driver: "John Doe",
    rating: 4.5,
    distance: 215,
    price: 45,
    instantBooking: true,
    verified: true,
    maxInBack: 3,
    smokingAllowed: false,
    petAllowed: true,
  },
  {
    id: 2,
    from: "Los Angeles",
    to: "San Francisco",
    departureTime: "9:00 AM",
    arrivalTime: "2:30 PM",
    date: "2023-06-26",
    driver: "Jane Smith",
    rating: 4.8,
    distance: 383,
    price: 65,
    instantBooking: false,
    verified: false,
    maxInBack: 2,
    smokingAllowed: true,
    petAllowed: false,
  },
  {
    id: 3,
    from: "Chicago",
    to: "Detroit",
    departureTime: "11:30 AM",
    arrivalTime: "2:45 PM",
    date: "2023-06-27",
    driver: "Mike Johnson",
    rating: 4.2,
    distance: 283,
    price: 55,
    instantBooking: true,
    verified: true,
    maxInBack: 3,
    smokingAllowed: false,
    petAllowed: false,
  },
  {
    id: 4,
    from: "Houston",
    to: "Austin",
    departureTime: "1:15 PM",
    arrivalTime: "4:00 PM",
    date: "2023-06-28",
    driver: "Emily Brown",
    rating: 4.6,
    distance: 165,
    price: 35,
    instantBooking: false,
    verified: false,
    maxInBack: 2,
    smokingAllowed: true,
    petAllowed: true,
  },
];

export default function SearchRide() {
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

  useEffect(() => {
    applyFiltersAndSort();
  }, [sortOptions, departureTimeFilters, additionalFilters]);

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real application, you would perform an actual search here
    console.log("Search performed");
  };

  const applyFiltersAndSort = () => {
    let filteredResults = [...initialRides];

    // Apply departure time filters
    if (Object.values(departureTimeFilters).some(Boolean)) {
      filteredResults = filteredResults.filter((ride) => {
        const hour = parseInt(ride.departureTime.split(":")[0]);
        const isPM = ride.departureTime.includes("PM");
        const hour24 = isPM && hour !== 12 ? hour + 12 : hour;
        if (departureTimeFilters.before6 && hour24 < 6) return true;
        if (departureTimeFilters["6to12"] && hour24 >= 6 && hour24 < 12)
          return true;
        if (departureTimeFilters["12to18"] && hour24 >= 12 && hour24 < 18)
          return true;
        if (departureTimeFilters.after18 && hour24 >= 18) return true;
        return false;
      });
    }

    // Apply additional filters
    if (additionalFilters.verifiedOnly) {
      filteredResults = filteredResults.filter((ride) => ride.verified);
    }
    if (additionalFilters.instantApproval) {
      filteredResults = filteredResults.filter((ride) => ride.instantBooking);
    }
    if (additionalFilters.smokingAllowed) {
      filteredResults = filteredResults.filter((ride) => ride.smokingAllowed);
    }
    if (additionalFilters.petAllowed) {
      filteredResults = filteredResults.filter((ride) => ride.petAllowed);
    }

    // Apply sort options
    if (sortOptions.earliestDeparture) {
      filteredResults.sort(
        (a, b) =>
          new Date(a.date + " " + a.departureTime).getTime() -
          new Date(b.date + " " + b.departureTime).getTime()
      );
    }
    if (sortOptions.lowestPrice) {
      filteredResults.sort((a, b) => a.price - b.price);
    }
    // Note: For demo purposes, we're not implementing actual logic for proximity-based sorting
    if (sortOptions.closeToDeparturePoint) {
      console.log("Sorting by proximity to departure point");
    }
    if (sortOptions.closeToArrivalPoint) {
      console.log("Sorting by proximity to arrival point");
    }
    if (sortOptions.shortestRide) {
      filteredResults.sort((a, b) => a.distance - b.distance);
    }

    setSearchResults(filteredResults);
  };

  const toggleSortOption = (option) => {
    setSortOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const toggleDepartureTimeFilter = (filter) => {
    setDepartureTimeFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const toggleAdditionalFilter = (filter) => {
    setAdditionalFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Navbar/>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-green-800">Find a Ride</h1>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500">
              Create Ride
            </button>
          </div>
          <form
            onSubmit={handleSearch}
            className="bg-white shadow-md rounded-lg p-6 mb-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  From
                </label>
                <input
                  id="from"
                  name="from"
                  type="text"
                  placeholder="City or location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="to"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="text"
                  placeholder="City or location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="when"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  When
                </label>
                <input
                  id="when"
                  name="when"
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label
                  htmlFor="passengers"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Passengers
                </label>
                <input
                  id="passengers"
                  name="passengers"
                  type="number"
                  min="1"
                  max="4"
                  defaultValue="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-green-700">
                  Sort by
                </h2>
                <div className="space-y-2">
                  {Object.entries(sortOptions).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => toggleSortOption(key)}
                        className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      />
                      <span>{key.split(/(?=[A-Z])/).join(" ")}</span>
                    </label>
                  ))}
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-4 text-green-700">
                  Departure time
                </h2>
                <div className="space-y-2">
                  {Object.entries(departureTimeFilters).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => toggleDepartureTimeFilter(key)}
                        className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      />
                      <span>
                        {key === "before6"
                          ? "Before 06:00 AM"
                          : key === "6to12"
                          ? "06:00 AM - 12:00 PM"
                          : key === "12to18"
                          ? "12:01 PM - 06:00 PM"
                          : "After 06:00 PM"}
                      </span>
                    </label>
                  ))}
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-4 text-green-700">
                  Additional Filters
                </h2>
                <div className="space-y-2">
                  {Object.entries(additionalFilters).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => toggleAdditionalFilter(key)}
                        className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                      />
                      <span>{key.split(/(?=[A-Z])/).join(" ")}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-green-700">
                  Available Rides
                </h2>
                <ul className="space-y-4">
                  {searchResults.map((ride) => (
                    <li
                      key={ride.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-green-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-500">
                              {ride.driver[0]}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-semibold text-gray-800">
                                {ride.driver}
                              </p>
                              {ride.verified && (
                                <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center">
                              <StarIcon className="h-4 w-4 text-yellow-400" />
                              <span className="ml-1 text-sm text-gray-600">
                                {ride.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ${ride.price}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ride.distance} miles
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          <div className="flex items-center text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            <span>
                              {ride.departureTime} - {ride.arrivalTime}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            <span>
                              {ride.from} to {ride.to}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div
                              className="flex items-center"
                              title={`Max ${ride.maxInBack} passengers in back`}
                            >
                              <UsersIcon className="h-4 w-4 text-gray-400" />
                              <span className="text-xs text-gray-500 ml-1">
                                Max {ride.maxInBack} in back
                              </span>
                            </div>
                            {ride.smokingAllowed && (
                              <div
                                className="flex items-center"
                                title="Smoking allowed"
                              >
                                <CigaretteIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                            {ride.petAllowed && (
                              <div
                                className="flex items-center"
                                title="Pets allowed"
                              >
                                <PawPrintIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </div>
                        <button className="ml-4 px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                          Book
                          {ride.instantBooking && (
                            <ZapIcon
                              className="inline-block ml-2 h-4 w-4 text-yellow-500"
                              title="Instant booking available"
                            />
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
