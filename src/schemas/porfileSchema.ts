import mongoose from 'mongoose';

export interface IProfile {
    name: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    email: string;
    gender: string;
}
const profileSchema = new mongoose.Schema<IProfile>({

    name: {
        type: String,
    },
    phone: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
    }

}, { _id: false });

export default profileSchema;