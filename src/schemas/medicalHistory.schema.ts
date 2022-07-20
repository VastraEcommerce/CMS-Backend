import mongoose, { Schema, Types } from 'mongoose';

export interface IDisease {
  name: string;
  description: string;
}

export interface IMedicalHistory {
  previousDiseases: IDisease[];
  chronicDiseases: IDisease[];
  currnetMedicines: Types.ObjectId[];
  isPregnantOrBreastfeeding: boolean;
}

const diseaseSchema = new Schema<IDisease>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const medicalHistorySchema = new mongoose.Schema<IMedicalHistory>(
  {
    previousDiseases: [
      {
        type: diseaseSchema,
      },
    ],
    chronicDiseases: [
      {
        type: diseaseSchema,
      },
    ],
    currnetMedicines: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
      },
    ],
    isPregnantOrBreastfeeding: Boolean,
  },
  { _id: false }
);

export default medicalHistorySchema;
