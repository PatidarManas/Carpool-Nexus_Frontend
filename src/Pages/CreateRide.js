import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Info,
  Plus,
  DollarSign,
  PawPrint,
  Flame,
  Baby,
  User,
  Edit,
  Upload,
  Check,
  BadgeCheck,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Tiles from "../Components/Tiles";

export default function CreateRide({ URL, USER }) {
  const history = useNavigate();

  const [step, setStep] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [stopovers, setStopovers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [customStopover, setCustomStopover] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(2);
  const [peopleAlreadyTraveling, setPeopleAlreadyTraveling] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [allowPets, setAllowPets] = useState(false);
  const [allowSmoking, setAllowSmoking] = useState(false);
  const [allowChildren, setAllowChildren] = useState(false);
  const [genderRestriction, setGenderRestriction] = useState("none");
  const [basePrice, setBasePrice] = useState("");
  const [usePricePerStopover, setUsePricePerStopover] = useState(false);
  const [stopoverPrices, setStopoverPrices] = useState({});
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [governmentId, setGovernmentId] = useState(null);
  const [path, setPath] = useState();
  const [carType, setCarType] = useState();
  const [autoBook, setAutoBook] = useState(true);

  const suggestionRef = useRef(null);

  const mockSearchResults = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "Houston, TX",
    "Phoenix, AZ",
  ];

  const mockStopovers = ["Philadelphia, PA", "San Francisco, CA", "Miami, FL"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target)
      ) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (query) => {
    const result = await axios.get(`${URL}/places/suggestions/${query}`);
    setSearchResults(result.data.suggestions);
    console.log(result);
  };

  const handleSelectSuggestion = async (suggestion) => {
    if (step === 1) {
      setFrom(suggestion);
      setStep(2);
    } else if (step === 2) {
      setTo(suggestion);
      setStep(3);
    }
    setSearchResults([]);
  };

  const handleToggleStopover = (stopover) => {
    setStopovers((prev) =>
      prev.includes(stopover)
        ? prev.filter((s) => s !== stopover)
        : [...prev, stopover].slice(0, 3)
    );
  };

  const handleAddCustomStopover = () => {
    if (
      customStopover &&
      !stopovers.includes(customStopover) &&
      stopovers.length < 3
    ) {
      setStopovers((prev) => [...prev, customStopover]);
      setCustomStopover("");
    }
  };

  const handleAvailableSeatsChange = (e) => {
    setAvailableSeats(Number(e.target.value));
  };

  const handlePeopleAlreadyTravelingChange = (e) => {
    setPeopleAlreadyTraveling(Number(e.target.value));
  };

  const handleCarTypeChange = (e) => {
    setCarType(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleBasePriceChange = (e) => {
    setBasePrice(e.target.value);
  };

  const handleStopoverPriceChange = (stopover, price) => {
    setStopoverPrices((prev) => ({ ...prev, [stopover]: price }));
  };

  const handleNext = () => {
    if (step < 10) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const isDateValid = () => {
    if (!date) return true;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    // In a real application, you would verify the OTP with a backend service
    if (otp === "123456") {
      setIsVerified(true);
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleGovernmentIdUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setGovernmentId(e.target.files[0]);
    }
  };

  const renderInputWithSuggestions = (value, onChange, placeholder) => (
    <div className="relative">
      <input
        type="text"
        value={
          typeof value === "string"
            ? value
            : value.description.length > 30
            ? value.description.substring(0, 30) + "..."
            : value.description
        }
        onChange={(e) => {
          onChange(e.target.value);
          handleSearch(e.target.value);
        }}
        onFocus={() => setFocusedInput(placeholder)}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder={placeholder}
      />
      <Search className="absolute right-3 top-3 text-gray-400" />
      {searchResults.length > 0 && focusedInput === placeholder && (
        <ul
          ref={suggestionRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-green-50 cursor-pointer flex items-center justify-between group"
              onClick={() => {
                handleSelectSuggestion(result);
              }}
            >
              <span>{result.description}</span>
              <ChevronRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderCheckbox = (id, label, checked, onChange, icon) => (
    <label
      htmlFor={id}
      className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-green-50 transition-colors"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400"
      />
      <span className="text-sm font-medium text-gray-700 flex items-center">
        {icon}
        <span className="ml-2">{label}</span>
      </span>
    </label>
  );

  const renderSummaryItem = (label, value, onEdit) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex items-center">
        <span className="text-gray-900 mr-2">
          {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
        </span>
        <button
          onClick={onEdit}
          className="text-green-500 hover:text-green-600"
        >
          <Edit size={16} />
        </button>
      </div>
    </div>
  );

  const submitHandler = async () => {
    try {
      const response = await axios.post(`${URL}/rides/new`, {
        from,
        to,
        stopovers,
        availableSeats,
        peopleAlreadyTraveling,
        date,
        time,
        allowPets,
        allowSmoking,
        allowChildren,
        genderRestriction,
        basePrice,
        usePricePerStopover,
        stopoverPrices,
        isVerified: true,
        path,
        carType,
        USER,
      });
      if (response.status == 201) {
        alert("created success");
        history("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-center p-4">
        <div className="w-full max-w-4xl h-[600px] bg-white rounded-xl shadow-lg overflow-hidden flex">
          <div className="w-1/2 p-8 flex flex-col">
            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Create a Ride
            </h2>
            <div className="flex-grow overflow-y-auto">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    From
                  </label>
                  {renderInputWithSuggestions(
                    from,
                    setFrom,
                    "Enter departure location"
                  )}
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    To
                  </label>
                  {renderInputWithSuggestions(
                    to,
                    setTo,
                    "Enter destination location"
                  )}
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-green-700">
                    Stopovers (Optional)
                  </h3>
                  <p className="text-sm text-gray-600">
                    Adding stopovers increases the likelihood of getting more
                    passengers by widening the passenger search radius.
                  </p>
                  <div className="space-y-2">
                    {mockStopovers.map((stopover, index) => (
                      <button
                        key={index}
                        onClick={() => handleToggleStopover(stopover)}
                        className={`w-full p-2 text-left rounded-md flex items-center justify-between transition-colors ${
                          stopovers.includes(stopover)
                            ? "bg-green-100 border-2 border-green-500"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <span>{stopover}</span>
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2 mt-4">
                    {stopovers
                      .filter((stopover) => !mockStopovers.includes(stopover))
                      .map((stopover, index) => (
                        <div
                          key={index}
                          onClick={() => handleToggleStopover(stopover)}
                          className="flex items-center justify-between bg-green-100 p-2 rounded-md border-2 border-green-500 cursor-pointer"
                        >
                          <span>{stopover}</span>
                        </div>
                      ))}
                  </div>
                  <div className="relative mt-4">
                    <input
                      type="text"
                      value={customStopover}
                      onChange={(e) => setCustomStopover(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter custom stopover"
                    />
                    <button
                      onClick={handleAddCustomStopover}
                      className="absolute right-2 top-2 bg-green-500 text-white p-1 rounded-md hover:bg-green-600"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="availableSeats"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Available Seats (seats that can be shared)
                    </label>
                    <select
                      id="availableSeats"
                      value={availableSeats}
                      onChange={handleAvailableSeatsChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="peopleAlreadyTraveling"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      People Already Traveling (including driver)
                    </label>
                    <select
                      id="peopleAlreadyTraveling"
                      value={peopleAlreadyTraveling}
                      onChange={handlePeopleAlreadyTravelingChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="carType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Select Car Type (Seater)
                    </label>
                    <select
                      id="carType"
                      value={carType}
                      onChange={handleCarTypeChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    >
                      {[
                        "Coupe (1 Seater)",
                        "Sedan (5 Seater)",
                        "Hatchback (5 Seater)",
                        "Compact SUV (5 Seater)",
                        "Midsize SUV (7 Seater)",
                        "Minivan (8 Seater)",
                      ].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={handleDateChange}
                        className={`mt-1 block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md ${
                          !isDateValid() ? "border-red-500" : ""
                        }`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      <Calendar
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                    {!isDateValid() && (
                      <p className="mt-1 text-sm text-red-600">
                        Please select a date today or in the future.
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Departure Time
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="mt-1 block w-full pl-10 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      />
                      <Clock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              )}
              {step === 6 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-700">
                    Ride Preferences
                  </h3>
                  <div className="space-y-4">
                    {renderCheckbox(
                      "allowPets",
                      "Allow Pets",
                      allowPets,
                      setAllowPets,
                      <PawPrint size={20} className="text-gray-400" />
                    )}
                    {renderCheckbox(
                      "allowSmoking",
                      "Allow Smoking",
                      allowSmoking,
                      setAllowSmoking,
                      <Flame size={20} className="text-gray-400" />
                    )}
                    {renderCheckbox(
                      "allowChildren",
                      "Allow Children",
                      allowChildren,
                      setAllowChildren,
                      <Baby size={20} className="text-gray-400" />
                    )}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender Restriction
                      </label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setGenderRestriction("none")}
                          className={`px-4 py-2 rounded-md flex items-center justify-center ${
                            genderRestriction === "none"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } transition-colors`}
                        >
                          <Users size={16} className="mr-2" /> None
                        </button>
                        <button
                          onClick={() => setGenderRestriction("men")}
                          className={`px-4 py-2 rounded-md flex items-center justify-center ${
                            genderRestriction === "men"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } transition-colors`}
                        >
                          <User size={16} className="mr-2" /> Men Only
                        </button>
                        <button
                          onClick={() => setGenderRestriction("women")}
                          className={`px-4 py-2 rounded-md flex items-center justify-center ${
                            genderRestriction === "women"
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } transition-colors`}
                        >
                          <User size={16} className="mr-2" /> Women Only
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 7 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-700">
                    Pricing
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="basePrice"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Base Price Per Person
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DollarSign
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          type="number"
                          inputMode="decimal"
                          name="basePrice"
                          id="basePrice"
                          className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          value={basePrice}
                          onChange={handleBasePriceChange}
                          step="0.01"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="usePricePerStopover"
                        checked={usePricePerStopover}
                        onChange={(e) =>
                          setUsePricePerStopover(e.target.checked)
                        }
                        className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400"
                      />
                      <label
                        htmlFor="usePricePerStopover"
                        className="text-sm font-medium text-gray-700"
                      >
                        Set price per stopover
                      </label>
                    </div>
                    {usePricePerStopover && (
                      <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-md">
                        {stopovers.map((stopover, index) => (
                          <div key={index}>
                            <label
                              htmlFor={`stopoverPrice-${index}`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Price for {stopover}
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <input
                                type="number"
                                inputMode="decimal"
                                name={`stopoverPrice-${index}`}
                                id={`stopoverPrice-${index}`}
                                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                value={stopoverPrices[stopover] || ""}
                                onChange={(e) =>
                                  handleStopoverPriceChange(
                                    stopover,
                                    e.target.value
                                  )
                                }
                                step="0.01"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {step === 8 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-700">
                    Verification
                  </h3>
                  <div className="space-y-4">
                    {USER.isPhoneVerified || true ? (
                      <div className="text-lg font-mono flex gap-2 border-b-[1px]">
                        Phone Already Verified <BadgeCheck color="green" />
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="otp"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Enter OTP
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            className="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            placeholder="Enter 6-digit OTP"
                          />
                          <button
                            onClick={handleVerifyOtp}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                          >
                            Verify
                          </button>
                        </div>
                      </div>
                    )}
                    {isVerified && (
                      <div className="flex items-center text-green-500">
                        <Check size={20} className="mr-2" />
                        <span>Verified successfully!</span>
                      </div>
                    )}
                    <div>
                      <label
                        htmlFor="governmentId"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Upload Government ID (Optional)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="governmentId"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="governmentId"
                                name="governmentId"
                                type="file"
                                className="sr-only"
                                onChange={handleGovernmentIdUpload}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step === 9 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-700">
                    Bookinng Preference
                  </h3>
                  
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Gender Restriction
                      </label>
                      <div className="flex space-x-4">
                        
                        <button
                          onClick={() => setAutoBook(true)}
                          className={`px-4 py-2 rounded-md flex items-center justify-center ${
                            autoBook 
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } transition-colors`}
                        >
                          <User size={16} className="mr-2" /> Auto - Book
                        </button>
                        <button
                          onClick={() => setAutoBook(false)}
                          className={`px-4 py-2 rounded-md flex items-center justify-center ${
                            !autoBook 
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-700"
                          } transition-colors`}
                        >
                          <User size={16} className="mr-2" /> Manual Aproval
                        </button>
                        
                      </div>
                    </div>
                  
                </div>
              )}
              {step === 10 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-green-700">
                    Review and Create Ride
                  </h3>
                  <div className="space-y-4">
                    {renderSummaryItem("From", from.description, () =>
                      setStep(1)
                    )}
                    {renderSummaryItem("To", to.description, () => setStep(2))}
                    {renderSummaryItem(
                      "Stopovers",
                      stopovers.join(", ") || "None",
                      () => setStep(3)
                    )}
                    {renderSummaryItem("Available Seats", availableSeats, () =>
                      setStep(4)
                    )}
                    {renderSummaryItem(
                      "People Already Traveling",
                      peopleAlreadyTraveling,
                      () => setStep(4)
                    )}
                    {renderSummaryItem("Date", date, () => setStep(5))}
                    {renderSummaryItem("Time", time, () => setStep(5))}
                    {renderSummaryItem("Allow Pets", allowPets, () =>
                      setStep(6)
                    )}
                    {renderSummaryItem("Allow Smoking", allowSmoking, () =>
                      setStep(6)
                    )}
                    {renderSummaryItem("Allow Children", allowChildren, () =>
                      setStep(6)
                    )}
                    {renderSummaryItem(
                      "Gender Restriction",
                      genderRestriction,
                      () => setStep(6)
                    )}
                    {renderSummaryItem("Base Price", `$${basePrice}`, () =>
                      setStep(7)
                    )}
                    {usePricePerStopover && (
                      <div className="py-2 border-b border-gray-200">
                        <span className="font-medium text-gray-700">
                          Stopover Prices:
                        </span>
                        {Object.entries(stopoverPrices).map(
                          ([stopover, price]) => (
                            <div
                              key={stopover}
                              className="flex justify-between items-center ml-4"
                            >
                              <span>{stopover}</span>
                              <span>${price}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 10 ? (
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={submitHandler}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ml-auto"
                >
                  Create Ride
                </button>
              )}
            </div>
          </div>
          <div className="w-1/2 bg-gray-100  flex flex-col">
            <div className="flex-grow overflow-y-auto">
              {step < 4 && (
                <div className="text-center w-full h-full ">
                  <Tiles
                    start={
                      typeof from === "string"
                        ? null
                        : [
                            from.geometry.location.lng,
                            from.geometry.location.lat,
                          ]
                    }
                    end={
                      typeof to === "string"
                        ? null
                        : [to.geometry.location.lng, to.geometry.location.lat]
                    }
                    setPath={setPath}
                  />
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <Users className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Seat Availability
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Available seats are the number of seats that can be
                        shared with other passengers. This is different from the
                        total number of people already traveling in your
                        vehicle.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Helpful Tip
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Consider leaving the middle back seat empty for more
                        passenger comfort. More available seats could increase
                        the likelihood of matching with passengers.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Date Selection
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Choosing high-demand dates can increase the chances of
                        finding passengers. Weekdays are often popular for
                        commuters, while weekends may attract leisure travelers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Time Selection
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Morning and evening rush hours are typically high-demand
                        periods for carpooling. Consider offering rides during
                        these peak times for better matching chances.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Helpful Tip
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Being flexible with your departure time by 15-30 minutes
                        can significantly increase your chances of finding a
                        carpool match.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 6 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <PawPrint className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pet Policy
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Allowing pets can increase your passenger search radius.
                        Many pet owners struggle to find transportation that
                        accommodates their furry friends.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Flame className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Smoking Policy
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Non-smoking rides are often preferred by many
                        passengers. However, allowing smoking might attract
                        specific passengers who value this option.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Baby className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Child-Friendly Rides
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Allowing children can make your ride more appealing to
                        families. This can significantly expand your potential
                        passenger pool.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Gender Preferences
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        While setting gender restrictions may limit your
                        passenger pool, it can make some passengers feel more
                        comfortable and secure during the ride.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 7 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pricing Strategy
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Setting competitive prices can attract more passengers.
                        Consider the costs of fuel, vehicle wear, and your time
                        when setting prices. Offering discounts for longer trips
                        or multiple passengers can increase bookings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Stopover Pricing
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Setting different prices for stopovers allows you to
                        adjust the fare based on the distance traveled. This can
                        make your ride more attractive to passengers who might
                        not be traveling the full route.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Environmental Impact
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        By carpooling, you're reducing carbon emissions. A full
                        car can save up to 1,600 pounds of greenhouse gas
                        emissions per year for a 20-mile round trip commute!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 8 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Verification Benefits
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Getting verified increases your chances of matching with
                        passengers by building trust and credibility. Verified
                        users are more likely to be chosen by passengers looking
                        for a safe and reliable ride.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Upload className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Government ID
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Uploading a government ID further enhances your
                        profile's credibility. This optional step can make
                        passengers feel more secure about riding with you.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 9 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Booking Prefrence
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Before the final step choose the way you would prefer
                        for booking requests to be processed, You can chosse
                        auto-match to automatically allot a corider and share
                        details with each other, or choose the manual way to
                        review profile and reuest before confirmation. Each
                        request in manual setting disapear in 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Recomendation
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Recommended to keep on auto-match for better and faster
                        matching (co-riders also prefer auto-matching)
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {step === 10 && (
                <div className="space-y-6 p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Final Review
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Take a moment to review all the details of your ride.
                        Ensuring accuracy will help attract the right passengers
                        and make your carpooling experience smoother.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="flex-shrink-0 w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Environmental Impact
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        By creating this ride, you're contributing to a greener
                        planet. Carpooling reduces carbon emissions and traffic
                        congestion. Thank you for making a positive impact on
                        the environment!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
