import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import Appointment from '../models/appointment.model';
import AppError from '../utils/AppError';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});

export const getCheckoutSession = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // todo 1) Get the currently booked appointment
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      next(new AppError('There is no appointment with this Id', 404));
    }

    // todo 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${appointment?.date} Appointment`,
              description: appointment?.invoice?.description,
              // images: ['urls'],
            },
            unit_amount: appointment?.invoice?.price! * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get('host')}/success.html`,
      cancel_url: `${req.protocol}://${req.get('host')}/cancel.html`,
    });

    // todo 3) Send session as response
    res.status(200).json({
      status: 'success',
      session,
    });
  }
);
