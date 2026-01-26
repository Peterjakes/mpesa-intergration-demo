import React, { useState } from 'react';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = () => {
    if (!phoneNumber || !amount) {
      setMessage('Please fill in all fields');
      return;
    }

    setMessage('Processing payment...');
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
