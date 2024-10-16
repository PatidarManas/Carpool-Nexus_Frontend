import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Users, Leaf, Eye, PlayCircle, MapPin, UserPlus, DollarSign, Shield, CheckCircle, Zap, Sliders, UserCheck, Calendar, Clock, Search, ChevronDown, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const words = ["Ride", "Thrive", "Save"];

const features = [
  {
    icon: DollarSign,
    title: "Cost Saving",
    description: "Reduce your travel expenses significantly by sharing rides. Our smart system helps you split costs fairly and affordably."
  },
  {
    icon: Zap,
    title: "Real-Time Matching",
    description: "Get instantly matched with the most relevant carpool options based on your route and schedule."
  },
  {
    icon: Sliders,
    title: "Preference Settings",
    description: "Customize your ride experience by setting preferences for gender, smoking habits, and pet-friendliness."
  },
  {
    icon: MapPin,
    title: "Live Tracking",
    description: "Track your ride or delivery in real-time for added convenience and peace of mind."
  },
  {
    icon: UserCheck,
    title: "Verification & Safety",
    description: "Enjoy a secure experience with our thorough user verification process, review system, and safety measures."
  }
];

const faqs = [
  {
    question: "How does Carpool Nexus work?",
    answer: "Carpool Nexus connects drivers and passengers going in the same direction. Users input their route and preferences, and our algorithm matches them with compatible carpoolers. Once matched, users can communicate, arrange pick-up points, and share costs."
  },
  {
    question: "Is Carpool Nexus safe?",
    answer: "Safety is our top priority. We implement user verification, profile ratings, and in-app safety features. We also provide tips for safe carpooling and encourage users to meet in public places for the first ride."
  },
  {
    question: "How much does it cost to use Carpool Nexus?",
    answer: "Carpool Nexus is free to download and use. Passengers typically share the cost of gas and tolls with the driver, but the exact amount is agreed upon between the carpoolers."
  },
  {
    question: "Can I use Carpool Nexus for long-distance trips?",
    answer: "Carpool Nexus is great for both daily commutes and longer journeys. Many users find it particularly useful for weekend trips or traveling to events."
  },
  {
    question: "What if my plans change and I need to cancel?",
    answer: "We understand plans can change. You can cancel your ride through the app, but we encourage doing so with as much notice as possible out of courtesy to your carpool partners."
  }
];

export default function LandingPage() {
  const [hoveredButton, setHoveredButton] = useState(null)
  const [index, setIndex] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prevFeature) => (prevFeature + 1) % features.length)
    }, 5000)
    return () => clearInterval(featureInterval)
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="bg-gradient-to-br from-teal-400 to-indigo-600 font-sans">
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl sm:text-3xl font-extrabold">Carpool Nexus</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-teal-200 transition">How It Works</a>
              <a href="#" className="text-white hover:text-teal-200 transition">Pricing</a>
              <a href="#" className="text-white hover:text-teal-200 transition">About Us</a>
            </div>
            <button className="bg-white text-indigo-600 hover:bg-indigo-100 transition duration-300 px-4 py-2 rounded-md">
              Sign Up
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="container mx-auto py-12 sm:py-20">
          <div className="text-center">
            <div className="relative h-24 sm:h-32 md:h-40 mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
                <span className="sr-only">
                  {words[index]} Together
                </span>
                <span aria-hidden="true" className="inline-block">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={words[index]}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      {words[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                {' '}
                <span className="text-yellow-300">Together</span>
              </h1>
            </div>
            <motion.p 
              className="text-xl sm:text-2xl text-teal-100 mb-8 sm:mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the smart commuting revolution. Save money, reduce traffic, and make new connections on your daily drive.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full transition-all duration-300 ease-in-out overflow-hidden h-14"
                onMouseEnter={() => setHoveredButton('start')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hoveredButton === 'start' ? 'startHovered' : 'startDefault'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {hoveredButton === 'start' ? (
                      <>
                        <Leaf className="mr-2" size={20} />
                        Save Environment
                      </>
                    ) : (
                      'Get Started'
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button 
                className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-full transition-all duration-300 ease-in-out overflow-hidden h-14"
                onMouseEnter={() => setHoveredButton('how')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={hoveredButton === 'how' ? 'howHovered' : 'howDefault'}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center"
                  >
                    {hoveredButton === 'how' ? (
                      <>
                        <Eye className="mr-2" size={20} />
                        See The Magic
                      </>
                    ) : (
                      'How It Works'
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Animated Illustrations */}
        <motion.div 
          className="absolute top-1/4 left-10 hidden lg:block"
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut"
          }}
        >
          <Car size={80} color="white" opacity={0.8} />
        </motion.div>
        <motion.div 
          className="absolute bottom-1/4 right-10 hidden lg:block"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Users size={80} color="white" opacity={0.8} />
        </motion.div>

        {/* Abstract Shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-60 right-60 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Carpool Nexus Works</h2>
            <p className="text-xl text-gray-600">Join the ride in four easy steps</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-12">
              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-green-500 rounded-full p-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">1. Set Your Route</h3>
                  <p className="text-gray-600">Enter your starting point and destination to find potential carpool matches along your route. Our smart algorithm considers factors like proximity and schedule compatibility.</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-100 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Shield className="w-6 h-6 text-green-500 mr-2" />
                  Safety First
                </h3>
                <p className="text-gray-600">We prioritize your safety with thorough user verification, ratings, and a responsive support team.</p>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-blue-500 rounded-full p-3">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2. Connect with Riders</h3>
                  <p className="text-gray-600">Browse profiles and connect with compatible carpoolers. All users undergo ID and mobile verification for safety. Riders and co-riders are rated based on their carpooling experiences.</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-100 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <CheckCircle className="w-6 h-6 text-blue-500 mr-2" />
                  Flexible Options
                </h3>
                <p className="text-gray-600">Whether you're a daily commuter or an occasional traveler, find the perfect carpool match for your needs.</p>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-purple-500 rounded-full p-3">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3. Enjoy the Ride</h3>
                  <p className="text-gray-600">Meet at the designated pickup point and enjoy a shared, eco-friendly commute. Rides may require confirmation from the driver, ensuring a smooth experience for all participants.</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-100 p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <Leaf className="w-6 h-6 text-green-500 mr-2" />
                  Eco-Friendly
                </h3>
                <p className="text-gray-600">Reduce your carbon footprint and contribute to a cleaner environment with every shared ride.</p>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-yellow-500 rounded-full p-3">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">4. Share Costs</h3>
                  <p className="text-gray-600">Split travel expenses easily through our integrated payment system. Costs can be based on various factors like distance, fuel prices, and vehicle type, and are negotiable between participants.</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:sticky lg:top-10 space-y-8">
              <div className="aspect-[9/16] bg-gray-200 rounded-lg overflow-hidden shadow-xl relative">
                <img
                  src="/placeholder.svg"
                  alt="Carpool Nexus in action"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-indigo-600 hover:bg-indigo-100 transition duration-300 rounded-full shadow-lg p-4"
                >
                  <PlayCircle className="w-12 h-12" />
                  <span className="sr-only">Play How It Works Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-indigo-800 mb-4">Key Features</h2>
            <p className="text-xl text-indigo-600">Discover what makes Carpool Nexus unique</p>
          </div>
          <div className="relative w-full max-w-4xl mx-auto">
            <motion.div
              className="w-full h-[400px] md:h-[600px] rounded-full border-8 border-indigo-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="absolute top-0 left-1/2 w-32 h-32 -ml-16 flex items-center justify-center"
                  style={{
                    transformOrigin: "50% 300px",
                    rotate: `${index * (360 / features.length)}deg`,
                  }}
                >
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center ${index === activeFeature ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} shadow-lg transition-all duration-300`}>
                    {React.createElement(feature.icon, { size: 40 })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-64 h-64 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h3 className="text-2xl font-semibold mb-2 text-indigo-800">{features[activeFeature].title}</h3>
                  <p className="text-sm text-indigo-600">{features[activeFeature].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Eco-Friendly Impact</h3>
            <p className="text-indigo-600">Track your carbon footprint reduction and see the positive impact you're making on the environment with every shared ride.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Community Building</h3>
            <p className="text-indigo-600">Connect with like-minded individuals in your area and build a network of reliable carpooling partners.</p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-indigo-800">Rewards Program</h3>
            <p className="text-indigo-600">Earn points for every ride you share and redeem them for exclusive discounts and perks from our partners.</p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Map Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Search Form */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-4xl w-full mx-4"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Your Perfect Ride</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
                <input
                  id="from"
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
                <input
                  id="to"
                  type="text"
                  placeholder="Enter destination"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-4">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Number of Passengers</label>
              <select
                id="passengers"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select passengers</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full mt-8 bg-gradient-to-r from-teal-400 to-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-teal-500 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" /> Find Rides
            </button>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about Carpool Nexus</p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="mt-2 p-4 bg-white rounded-lg shadow-md">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Carpool Nexus</h3>
              <p className="text-gray-400">Connecting commuters, reducing traffic, and saving the environment one ride at a time.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">How It Works</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Safety</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Facebook size={24} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Instagram size={24} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <Linkedin size={24} />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Carpool Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full">
            <div className="flex justify-end mb-2">
              <button onClick={() => setIsVideoOpen(false)} className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Carpool Nexus: How It Works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}