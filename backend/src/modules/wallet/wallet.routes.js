/**
 * Wallet Routes
 * 
 * Wallet API endpoints.
 */

const express = require('express');
const router = express.Router();
const walletController = require('./wallet.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody, validateQuery } = require('../../middleware/validate');
const {
  createTopUpSchema,
  transactionQuerySchema,
  topUpQuerySchema,
} = require('./wallet.schema');

// All routes require authentication
router.use(authenticate);

// Balance
router.get('/balance', walletController.getBalance);

// Top-ups
router.post('/topup', validateBody(createTopUpSchema), walletController.createTopUp);
router.get('/topup', validateQuery(topUpQuerySchema), walletController.getTopUps);
router.get('/topup/:id', walletController.getTopUpById);

// Transactions
router.get('/transactions', validateQuery(transactionQuerySchema), walletController.getTransactions);
router.get('/transactions/:id', walletController.getTransactionById);

module.exports = router;
