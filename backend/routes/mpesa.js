const express = require('express');
const router = express.Router();
const {
  generateAccessToken,
  initiateSTKPush,
  stkPushCallback,
  queryTransaction
} = require('../controllers/mpesaController');

// STK Push initiation
router.post('/stk-push', generateAccessToken, initiateSTKPush);

// Callback URL
router.post('/callback', stkPushCallback);

// Query transaction status
router.post('/query/:checkoutRequestId', generateAccessToken, queryTransaction);

module.exports = router;