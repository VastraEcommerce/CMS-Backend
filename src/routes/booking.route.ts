import express from 'express';
import { login } from '../controllers/auth.controller';
import {
  getCheckoutSession,
  webhooksHandler,
} from '../controllers/booking.controller';

const router = express.Router();
router.get('/create-checkout-session/:id', login, getCheckoutSession);
router.post('/webhooks', webhooksHandler);

export default router;
