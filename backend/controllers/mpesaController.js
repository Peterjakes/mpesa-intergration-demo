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
    res.status(500).json({ success: false, message: 'Token generation failed' });
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

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
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
      },
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
    res.status(500).json({
      success: false,
      message: 'Failed to initiate STK Push',
    });
  }
};

module.exports = {
  generateAccessToken,
  initiateSTKPush,
};
