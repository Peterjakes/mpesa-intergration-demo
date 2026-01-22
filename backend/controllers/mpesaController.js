const axios = require('axios');

// Generate Access Token
const generateAccessToken = async (req, res, next) => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    req.accessToken = response.data.access_token;
    next();
  } catch (error) {
    console.error('Access Token Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate access token',
    });
  }
};

// Initiate STK Push
const initiateSTKPush = async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({
      success: false,
      message: 'Phone number and amount are required',
    });
  }

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const stkPushPayload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phoneNumber,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phoneNumber,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: 'MPesaDemo',
    TransactionDesc: 'Payment for services',
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushPayload,
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    res.json({
      success: true,
      message: 'STK Push initiated successfully',
      data: response.data,
    });
  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate STK Push',
      error: error.response?.data || error.message,
    });
  }
};

// STK Push Callback
const stkPushCallback = (req, res) => {
  console.log('--- STK Push Callback ---');
  console.log(JSON.stringify(req.body, null, 2));

  const callbackData = req.body.Body?.stkCallback;

  if (!callbackData) {
    return res.status(400).json({
      success: false,
      message: 'Invalid callback data',
    });
  }

  const { ResultCode, ResultDesc, CheckoutRequestID } = callbackData;

  if (ResultCode === 0) {
    // Payment successful
    console.log('✅ Payment Successful:', CheckoutRequestID);
    // Here you would update your database
  } else {
    // Payment failed
    console.log('❌ Payment Failed:', ResultDesc);
  }

  res.json({ success: true, message: 'Callback received' });
};

// Query Transaction Status
const queryTransaction = async (req, res) => {
  const { checkoutRequestId } = req.params;

  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, -3);

  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const queryPayload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      queryPayload,
      {
        headers: {
          Authorization: `Bearer ${req.accessToken}`,
        },
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Query Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to query transaction',
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {
  generateAccessToken,
  initiateSTKPush,
  stkPushCallback,
  queryTransaction,
};