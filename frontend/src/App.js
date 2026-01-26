import React, { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async () => {
    if (!phoneNumber || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/mpesa/stk-push`, {
        phoneNumber,
        amount: Number(amount),
      });

      setMessage(response.data.message || 'Payment initiated');
    } catch (error) {
      setMessage('Payment failed');
    }
  };

  return (
    <div>
      <h1>M-Pesa Integration Demo</h1>

      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handlePayment}>
        Pay with M-Pesa
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
