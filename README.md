 📱 M-Pesa Payment Integration Demo

A full-stack M-Pesa payment integration using React, Node.js/Express, and the Daraja API (Safaricom Sandbox).

## ✨ Features

- 🔐 Secure STK Push payment initiation
- ⚡ Real-time payment status updates
- 📱 Responsive design for mobile and desktop
- 🎨 Modern UI with Tailwind-inspired styling
- 🔄 Callback handling for payment confirmation
- 📊 Transaction status query

 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- Lucide React (icons)

**Backend:**
- Node.js
- Express
- Daraja API (M-Pesa Sandbox)

 📋 Prerequisites

- Node.js (v16+)
- Safaricom Developer Account
- ngrok (for local callback testing)

 🚀 Getting Started

### 1. Get Daraja API Credentials

1. Visit [Safaricom Developer Portal](https://developer.safaricom.co.ke)
2. Create an app and get your Consumer Key and Consumer Secret
3. Copy the Passkey for Lipa Na M-Pesa Online

### 2. Clone & Install
```bash
git clone <your-repo-url>
cd mpesa-payment-demo

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure Environment Variables

**Backend (.env):**
```env
MPESA_CONSUMER_KEY=your_key_here
MPESA_CONSUMER_SECRET=your_secret_here
MPESA_PASSKEY=your_passkey_here
MPESA_SHORTCODE=174379
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Setup Callback URL (ngrok)
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok
ngrok http 5000

# Copy the HTTPS URL and update MPESA_CALLBACK_URL in backend/.env
```

### 5. Run the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Access the app at `http://localhost:3000`

 🧪 Testing

Use these test credentials in Sandbox:

- **Phone Number:** 254708374149
- **Amount:** 1 - 100000 KES
- **Shortcode:** 174379

 📁 Project Structure
 mpesa-payment-demo/
├── backend/
│   ├── controllers/
│   │   └── mpesaController.js
│   ├── routes/
│   │   └── mpesa.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── .env
│   └── package.json
└── README.md

🔑 API Endpoints

USE POSTMAN

### POST /api/mpesa/stk-push
Initiate STK Push payment

**Body:**
```json
{
  "phoneNumber": "254712345678",
  "amount": 100
}
```

### POST /api/mpesa/callback
Receive payment callbacks from Safaricom

### POST /api/mpesa/query/:checkoutRequestId
Query transaction status

 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

 🔗 Resources

- [Daraja API Documentation](https://developer.safaricom.co.ke/Documentation)
- [M-Pesa API Reference](https://developer.safaricom.co.ke

📸 Screenshots
<img width="2334" height="1749" alt="image" src="https://github.com/user-attachments/assets/48c27196-b895-4244-8e54-2153d6bc36ba" />
