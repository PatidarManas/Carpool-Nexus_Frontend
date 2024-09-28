'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, MapPin, ChevronRight } from 'lucide-react'

export default function CreateRide() {
  const [step, setStep] = useState(1)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [stopovers, setStopovers] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [customStopover, setCustomStopover] = useState('')
  const [focusedInput, setFocusedInput] = useState(null)

  const suggestionRef = useRef(null)

  const mockSearchResults = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ'
  ]

  const mockStopovers = [
    'Philadelphia, PA',
    'San Francisco, CA',
    'Miami, FL'
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSearchResults([])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (query) => {
    setSearchResults(mockSearchResults.filter(result => 
      result.toLowerCase().includes(query.toLowerCase())
    ))
  }

  const handleSelectSuggestion = (suggestion) => {
    if (step === 1) {
      setFrom(suggestion)
    } else if (step === 2) {
      setTo(suggestion)
    }
    setSearchResults([])
  }

  const handleToggleStopover = (stopover) => {
    setStopovers(prev => 
      prev.includes(stopover)
        ? prev.filter(s => s !== stopover)
        : [...prev, stopover].slice(0, 3)
    )
  }

  const handleAddCustomStopover = () => {
    if (customStopover && !stopovers.includes(customStopover) && stopovers.length < 3) {
      setStopovers(prev => [...prev, customStopover])
      setCustomStopover('')
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const renderInputWithSuggestions = (value, onChange, placeholder) => {
    return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          handleSearch(e.target.value)
        }}
        onFocus={() => setFocusedInput(placeholder)}
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
        placeholder={placeholder}
      />
      <Search className="absolute right-3 top-3 text-gray-400" />
      {searchResults.length > 0 && focusedInput === placeholder && (
        <ul ref={suggestionRef} className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {searchResults.map((result, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-green-50 cursor-pointer flex items-center justify-between group"
              onClick={() => handleSelectSuggestion(result)}
            >
              <span>{result}</span>
              <ChevronRight className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      )}
    </div>)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-xl shadow-lg overflow-hidden flex">
        <div className="w-1/2 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold text-green-700 mb-6">Create a Ride</h2>
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">From</label>
              {renderInputWithSuggestions(from, setFrom, "Enter departure location")}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">To</label>
              {renderInputWithSuggestions(to, setTo, "Enter destination location")}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-700">Stopovers (Optional)</h3>
              <p className="text-sm text-gray-600">
                Adding stopovers increases the likelihood of getting more passengers by widening the passenger search radius.
              </p>
              <div className="space-y-2">
                {mockStopovers.map((stopover, index) => (
                  <button
                    key={index}
                    onClick={() => handleToggleStopover(stopover)}
                    className={`w-full p-2 text-left rounded-md flex items-center justify-between transition-colors ${
                      stopovers.includes(stopover)
                        ? 'bg-green-100 border-2 border-green-500'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <span>{stopover}</span>
                  </button>
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
                  Add
                </button>
              </div>
              <div className="space-y-2 mt-4">
                {stopovers.filter(stopover => !mockStopovers.includes(stopover)).map((stopover, index) => (
                  <div
                    key={index}
                    onClick={() => handleToggleStopover(stopover)}
                    className="flex items-center justify-between bg-green-100 p-2 rounded-md border-2 border-green-500 cursor-pointer"
                  >
                    <span>{stopover}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => console.log('Submit ride', { from, to, stopovers })}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ml-auto"
              >
                Create Ride
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">Map will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}