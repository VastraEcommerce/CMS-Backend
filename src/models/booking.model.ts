import mongoose, { Schema, Types, model } from 'mongoose';

export interface IBooking {
  appointment: Types.ObjectId;
  employee: Types.ObjectId;
  price: Number;
  paid: Boolean;
}

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'employee',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = model<IBooking>('Booking', bookingSchema);

export default bookingModel;
