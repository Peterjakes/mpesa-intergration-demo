import React, { useState } from 'react';
import axios from 'axios';
import { Smartphone, CheckCircle, XCircle, Loader, CreditCard, Shield, Zap } from 'lucide-react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [checkoutRequestId, setCheckoutRequestId] = useState('');

  const handlePayment = async () => {
    if (!phoneNumber || !amount) {
      setStatus('error');
      setMessage('Please fill in all fields');
      return;
    }

    // Validate phone number format
    if (!/^254\d{9}$/.test(phoneNumber)) {
      setStatus('error');
      setMessage('Phone number must be in format 254XXXXXXXXX');
      return;
    }

    setStatus('processing');
    setMessage('Initiating payment...');

    try {
      const response = await axios.post(`${API_URL}/mpesa/stk-push`, {
        phoneNumber,
        amount: parseInt(amount),
      });

      if (response.data.success) {
        setStatus('success');
        setMessage('Payment initiated! Check your phone for M-Pesa prompt.');
        setCheckoutRequestId(response.data.data.CheckoutRequestID);
      } else {
        setStatus('error');
        setMessage('Payment initiation failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(
        error.response?.data?.message || 'Payment failed. Please try again.'
      );
      console.error('Payment error:', error);
    }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setAmount('');
    setStatus('idle');
    setMessage('');
    setCheckoutRequestId('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">M-Pesa Integration</h1>
              <p className="text-xs text-gray-500">Daraja API Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">Sandbox Mode</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Feature Cards */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">Bank-grade encryption and security standards</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Processing</h3>
            <p className="text-sm text-gray-600">Real-time payment confirmation</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Integration</h3>
            <p className="text-sm text-gray-600">Simple API with full documentation</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Make Payment</h2>
              <p className="text-gray-600">Enter your M-Pesa details to complete the transaction</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    placeholder="254712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    disabled={status === 'processing'}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Format: 254XXXXXXXXX</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (KES)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">KES</span>
                  </div>
                  <input
                    type="number"
                    placeholder="100"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    min="1"
                    disabled={status === 'processing'}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Minimum: KES 1</p>
              </div>

              <button
                onClick={handlePayment}
                disabled={status === 'processing' || !phoneNumber || !amount}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                {status === 'processing' ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5" />
                    Pay with M-Pesa
                  </>
                )}
              </button>

              {status !== 'idle' && status !== 'processing' && (
                <button
                  onClick={resetForm}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Make Another Payment
                </button>
              )}
            </div>

            {/* Status Messages */}
            {status !== 'idle' && (
              <div className={`mt-6 p-4 rounded-lg flex items-start gap-3 ${
                status === 'success' ? 'bg-green-50 border border-green-200' :
                status === 'error' ? 'bg-red-50 border border-red-200' :
                'bg-blue-50 border border-blue-200'
              }`}>
                {status === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
                {status === 'error' && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                {status === 'processing' && <Loader className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />}
                <div className="flex-1">
                  <p className={`font-medium ${
                    status === 'success' ? 'text-green-900' :
                    status === 'error' ? 'text-red-900' :
                    'text-blue-900'
                  }`}>
                    {message}
                  </p>
                  {status === 'success' && checkoutRequestId && (
                    <p className="text-xs text-green-700 mt-2 font-mono">
                      Request ID: {checkoutRequestId}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">How it works</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Enter Details</p>
                    <p className="text-green-100 text-sm">Provide your M-Pesa number and amount</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Receive Prompt</p>
                    <p className="text-green-100 text-sm">Get STK push notification on your phone</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Enter PIN</p>
                    <p className="text-green-100 text-sm">Complete payment with your M-Pesa PIN</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Confirmation</p>
                    <p className="text-green-100 text-sm">Receive instant payment confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Test Credentials</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-blue-700">Phone Number:</span>
                  <span className="font-mono text-blue-900">254708374149</span>
                </div>
                <div className="flex justify-between py-2 border-b border-blue-200">
                  <span className="text-blue-700">Test Amount:</span>
                  <span className="font-mono text-blue-900">1 - 100000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-blue-700">Environment:</span>
                  <span className="font-mono text-blue-900">Sandbox</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>M-Pesa Integration Demo • Built with React, Node.js & Daraja API</p>
        </div>
      </footer>
    </div>
  );
}

export default App;