import mongoose from 'mongoose';
import validator from 'validator';

export interface IProfile {
    name: string;
    phone: string;
    dateOfBirth: Date;
    address: string;
    email: string;
    gender: "male" | "female";
}
const profileSchema = new mongoose.Schema<IProfile>({

    name: {
        type: String,
        required: true,
        validate: [validator.isAlpha, "Your Name Must Contains Only Letters"]
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isMobilePhone, "Please Enter Your Phone Number"],
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: [validator.isDate, "Please Enter Date AS YYYY/MM/DD"],
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        maxLength: 30,
        lowerCase: true,
        validate: [validator.isEmail, 'foo@bar.com'],
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    }

}, { _id: false });

export default profileSchema;