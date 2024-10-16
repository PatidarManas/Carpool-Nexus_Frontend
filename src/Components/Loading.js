import { Car } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-white/30 rounded-full animate-pulse"></div>
        <Car className="w-24 h-24 text-white animate-bounce" />
      </div>
      <h1 className="mt-8 text-4xl font-bold text-white tracking-wider">
        Carpool Nexus
      </h1>
      <p className="mt-4 text-xl text-white/80 animate-pulse">
        Connecting journeys...
      </p>
      <div className="mt-8 flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  )
}