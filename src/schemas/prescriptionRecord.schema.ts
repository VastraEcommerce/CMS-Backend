import { Model, Schema, Types, model, HydratedDocument } from 'mongoose';

enum TimeUnit {
  MINUTE,
  HOUR,
  DAY,
  MONTH,
}

interface IFrequency {
  dose: number;
  timeUnit: keyof typeof TimeUnit;
  timeUnitCount: number;
}

export interface IPrescriptionRecord {
  medicine: Types.ObjectId;
  frequency: IFrequency;
  duration: Number;
  foodRelationship: string;
}

const freqSchema = new Schema<IFrequency>(
  {
    dose: {
      type: Number,
      default: 1,
      required: [true, 'Dose can not be empty'],
    },
    timeUnit: {
      type: String,
      enum: {
        values: Object.values(TimeUnit),
        message: 'Time unit is not valid',
      },
      default: 'HOUR',
      required: [true, 'Time unit can not be empty'],
    },
    timeUnitCount: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const schema = new Schema<IPrescriptionRecord>(
  {
    medicine: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
      required: [true, 'Medicine can not be empty'],
    },
    frequency: {
      type: freqSchema,
      required: [true, 'Frequency can not be empty'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration can not be empty'],
    },
  },
  {
    _id: false,
  }
);

export default schema;
