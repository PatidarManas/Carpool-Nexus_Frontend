import { useState, useEffect, memo } from 'react'
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Car, Calendar, User, MapPin, Clock } from 'lucide-react'
import axios from 'axios'

const titles = ["Join the Ride", "Personal Details", "Stay Connected", "Ready to Roll!"]
const features = [
  {
    title: "Find Your Perfect Ride",
    description: "Connect with drivers going your way and enjoy a comfortable journey.",
    icon: <Car className="w-12 h-12 text-white" />,
    image: "https://images.pexels.com/photos/54278/pexels-photo-54278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    title: "Save Time and Money",
    description: "Split costs and reduce travel time by sharing rides with others.",
    icon: <Clock className="w-12 h-12 text-white" />,
    image: "https://images.pexels.com/photos/5849580/pexels-photo-5849580.jpeg"
  },
  {
    title: "Reduce Your Carbon Footprint",
    description: "Help the environment by sharing rides and reducing emissions.",
    icon: <MapPin className="w-12 h-12 text-white" />,
    image: "https://images.pexels.com/photos/19280756/pexels-photo-19280756/free-photo-of-fuel-dispensers-by-window-and-wall.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
]

const CustomSelect = memo(({ name, options, value, onChange, placeholder }) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500 appearance-none bg-white"
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
    <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" />
  </div>
))

const SignupForm = memo(({ step, formData, handleInputChange, nextStep, prevStep, signUpSubmit }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h2 className="text-3xl font-bold text-green-800">{titles[step]}</h2>
    {step === 0 && (
      <>
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
          />
        </div>
        <CustomSelect
          name="title"
          options={[
            { value: "Mr", label: "Mr" },
            { value: "Ms", label: "Ms" },
            { value: "Mrs", label: "Mrs" },
            { value: "Dr", label: "Dr" }
          ]}
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Select Title"
        />
      </>
    )}
    {step === 1 && (
      <>
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 pointer-events-none" />
        </div>
      </>
    )}
    {step === 2 && (
      <>
        <div className="relative">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
          />
        </div>
        {formData.phone && (
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isWhatsapp"
              checked={formData.isWhatsapp}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-green-500 rounded focus:ring-green-400"
            />
            <span>Is this your WhatsApp number?</span>
          </label>
        )}
      </>
    )}
    {step === 3 && (
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Car className="text-green-500 w-24 h-24 mx-auto mb-4" />
        </motion.div>
        <p className="text-green-600 text-xl">Great! You're all set to start carpooling!</p>
      </div>
    )}
    <div className="flex justify-between">
      {step > 0 && step < 2 (
        <button onClick={prevStep} className="px-6 py-3 bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-300">
          <ChevronLeft className="inline mr-1" /> Back
        </button>
      )}
      {step < 2 && (
        <button onClick={nextStep} className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 ml-auto">
          Next <ChevronRight className="inline ml-1" />
        </button>
      )}
      {step == 2 && (
        <button onClick={signUpSubmit} className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 ml-auto">
          Submit <ChevronRight className="inline ml-1" />
        </button>
      )}
    </div>
  </motion.div>
))

const LoginForm = memo(({loginSubmit, handleInputChange}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-6"
  >
    <h2 className="text-3xl font-bold text-green-800">Welcome Back!</h2>
    <div className="relative">
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
      />
    </div>
    <div className="relative">
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        className="w-full p-3 border-2 border-green-300 rounded-full focus:outline-none focus:border-green-500"
      />
    </div>
    <button onClick={loginSubmit}  className="w-full px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300">
      Log In
    </button>
  </motion.div>
))

const FeatureSlides = memo(({ currentFeature }) => (
  <div className="bg-green-600 h-full p-8 flex items-center justify-center relative">
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-white via-white to-transparent"></div>
    <AnimatePresence mode="wait">
      <motion.div
        key={currentFeature}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-white text-center"
      >
        <img src={features[currentFeature].image} alt={features[currentFeature].title} className="w-full h-64 object-cover rounded-lg mb-6" />
        {features[currentFeature].icon}
        <h3 className="text-2xl font-bold mb-2">{features[currentFeature].title}</h3>
        <p>{features[currentFeature].description}</p>
      </motion.div>
    </AnimatePresence>
  </div>
))

export default function Component({URL}) {
  const history = useNavigate();

  const [isLogin, setIsLogin] = useState(true)
  const [step, setStep] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    dob: '',
    phone: '',
    isWhatsapp: false
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0))
  const signUpSubmit = async() => {
    try {
      const response = await axios.post(`${URL}/auth/signup`,formData);
      if(response.status == 201){
        nextStep();
      }
    } catch (error) {
      if(error.status == 400){
        alert("User email already exists");
      }
    }
  }

  const loginSubmit = async() => {
    try {
      const response = await axios.post(`${URL}/auth/login`,formData);
      if(response.status == 200){
        document.cookie = "token=" + response.data.token;
        setTimeout(() => {
                  
          history("/dashboard");
          window.location.reload();
        }, 600);
      }
    } catch (error) {
      if(error.status == 400){
        alert("User details unmatched");
      }
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 order-2 lg:order-1 p-8 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-700"></div>
            <div className="flex justify-center mb-6">
              <Car className="text-green-500 w-16 h-16" />
            </div>
            <h1 className="text-4xl font-bold text-center text-green-800 mb-8">CarPool Connect</h1>
            <AnimatePresence mode="wait">
              {isLogin ? 
                <LoginForm key="login" loginSubmit={loginSubmit} handleInputChange={handleInputChange} /> : 
                <SignupForm 
                  key="signup" 
                  step={step} 
                  formData={formData} 
                  handleInputChange={handleInputChange}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  signUpSubmit={signUpSubmit}
                />
              }
            </AnimatePresence>
            <p className="mt-6 text-center">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 hover:underline font-semibold"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <FeatureSlides currentFeature={currentFeature} />
          </div>
        </div>
      </div>
    </div>
  )
}