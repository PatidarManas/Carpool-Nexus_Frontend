import React, { useState } from 'react'
import { CreditCard, Smartphone, QrCode, AlertCircle, Wallet } from 'lucide-react'

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    alert('Payment Successful: Your ride has been booked successfully.')
  }

  const renderPaymentMethodContent = () => {
    switch (paymentMethod) {
      case 'credit':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input type="text" id="cardholderName" placeholder="John Doe" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" className="w-full p-2 border border-gray-300 rounded-md" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="text" id="expiry" placeholder="MM/YY" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex-1">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" id="cvv" placeholder="123" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        )
      case 'upi':
        return (
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
            <input type="text" id="upiId" placeholder="yourname@upi" className="w-full p-2 border border-gray-300 rounded-md" />
            <p className="mt-2 text-sm text-gray-500">You will be redirected to your UPI app to complete the payment.</p>
          </div>
        )
      case 'scan':
        return (
          <div className="text-center">
            <div className="bg-gray-100 h-64 w-64 mx-auto flex items-center justify-center rounded-md">
              <QrCode className="h-40 w-40 text-gray-400" />
            </div>
            <p className="mt-4 text-sm text-gray-500">Scan this QR code with your preferred payment app to complete the transaction.</p>
          </div>
        )
      case 'cash':
        return (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Cash Payment Warning</h3>
                <p className="mt-2 text-sm text-yellow-700">
                  Carpool Nexus is not responsible for cash transactions. Please exercise caution and only use this method if you trust the driver.
                </p>
              </div>
            </div>
          </div>
        )
      case 'wallet':
        return (
          <div>
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-1">Choose a wallet</label>
            <select id="wallet" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="paypal">PayPal</option>
              <option value="gpay">Google Pay</option>
              <option value="paytm">Paytm</option>
              <option value="phonepe">PhonePe</option>
            </select>
            <p className="mt-2 text-sm text-gray-500">You'll be redirected to your selected wallet to complete the payment.</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-1">Complete Your Payment</h1>
        <p className="text-gray-600 mb-6">Secure your carpool ride by finalizing your payment</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Ride Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
            <div>Time: 10:00 AM</div>
            <div>Distance: 25 km</div>
            <div>Price per seat: ₹150</div>
            <div>From: Koramangala to Whitefield</div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment Information</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            Paid to: John Doe (Driver)
          </div>
        </section>

        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <strong>Shared ride from Koramangala to Whitefield</strong>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment Breakdown</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span>Fare</span>
              <span>₹150.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service Charge</span>
              <span>₹15.00</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (GST)</span>
              <span title="18% GST applied on the total fare and service charge">₹29.70 ℹ️</span>
            </div>
            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹194.70</span>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment Options</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { value: 'credit', label: 'Credit/Debit Card', icon: CreditCard },
              { value: 'upi', label: 'UPI', icon: Smartphone },
              { value: 'scan', label: 'Scan and Pay', icon: QrCode },
              { value: 'cash', label: 'By Cash', icon: AlertCircle },
              { value: 'wallet', label: 'Wallet', icon: Wallet },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPaymentMethod(option.value)}
                className={`flex items-center p-3 border rounded-md ${
                  paymentMethod === option.value ? 'border-black bg-gray-100' : 'border-gray-300'
                }`}
              >
                <option.icon className="h-5 w-5 mr-2" />
                {option.label}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          {renderPaymentMethodContent()}
        </section>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-3 px-4 rounded-md text-white font-semibold ${
            isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {isProcessing ? "Processing..." : "Confirm and Pay ₹194.70"}
        </button>

        <div className="mt-4 text-sm text-gray-600">
          <p className="flex items-center mb-1">
            <CreditCard className="h-4 w-4 mr-2" />
            Secure payment powered by 256-bit SSL encryption
          </p>
          <p className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            We do not store your payment details
          </p>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-600">
        <p>Need assistance? Contact our support team at support@carpoolnexus.com</p>
        <div className="mt-2">
          <a href="#" className="underline hover:text-black mr-4">Terms of Service</a>
          <a href="#" className="underline hover:text-black">Privacy Policy</a>
        </div>
      </footer>
    </div>
  )
}