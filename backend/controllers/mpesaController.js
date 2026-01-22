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
    console.error('Access Token Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate access token',
    });
  }
};

module.exports = {
  generateAccessToken,
};

