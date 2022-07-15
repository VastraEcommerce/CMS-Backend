import express from "express";
import * as bookingController from "./../controllers/booking.controller";

const router = express.Router();
router.get("/create-checkout-session", bookingController.getCheckoutSession);

export default router;
