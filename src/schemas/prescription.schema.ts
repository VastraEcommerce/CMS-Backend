import { Model, Schema, Types, model, HydratedDocument } from 'mongoose';

interface IPrescription {}

const schema = new Schema<IPrescription>(
  {},
  {
    _id: false,
  }
);

export default IPrescription;
