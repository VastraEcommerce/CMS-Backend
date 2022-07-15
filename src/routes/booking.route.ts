import express from "express";
import * as bookingController from "./../controllers/booking.controller";
import * as authController from "./../controllers/auth.controller";

const router = express.Router();
router.get(
  "/create-checkout-session/:id",
  authController.login,
  bookingController.getCheckoutSession
);

export default router;
