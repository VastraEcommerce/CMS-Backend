import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
import profileSchema, { IProfile } from '../schemas/porfile.schema';

export interface IDoctor {

    profile: IProfile;
    specialzation: string;
}


const doctorSchema = new mongoose.Schema<IDoctor>({

    profile: {
        type: profileSchema,
        required: true,

    },
    specialzation: {
        type: String,
        required: true,
        validate: [validator.isAlpha, 'Please Enter the Speclization']
    }

});


const DoctorModel = mongoose.model<IDoctor>('doctor', doctorSchema);

export default DoctorModel;