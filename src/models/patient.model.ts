import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
import medicalHistorySchema, { IMedicalHistory } from '../schemas/medicalHistory.schema';
import profileSchema, { IProfile } from '../schemas/porfile.schema';

export interface IPatient {

    profile: IProfile;
    medicalHistory: IMedicalHistory;
}

const patientSchema = new mongoose.Schema<IPatient>({

    profile: {
        type: profileSchema,
        required: true,
    },
    medicalHistory: {
        type: medicalHistorySchema,
        required: true,
    }


});
const PatientModel = mongoose.model<IPatient>('Patient', patientSchema);

export default PatientModel;