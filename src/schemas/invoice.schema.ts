import { Model, Schema, Types, model, HydratedDocument } from 'mongoose';

export interface IInvoice {
  price: number;
  description: string;
}

const schema = new Schema<IInvoice>({
  price: {
    type: Number,
    required: [true, 'Appointment cost can not be empty'],
  },
  description: {
    type: String,
    required: [true, 'Appointment description can not be empty'],
  },
});

export default schema;
