import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
import profileSchema, { IProfile } from '../schemas/porfile.schema';
import bycrypt from 'bcryptjs';

export interface IEmployee {

    profile: IProfile;
    department: string;
    role: "admin" | "user";
    password: string;
}

const employeeSchema = new mongoose.Schema<IEmployee>({

    profile: {
        type: profileSchema,
        // required: true,

    },
    department: {
        type: String,
        required: true,
        validate: [validator.isAlpha, 'Please Enter the Speclization']
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        required: true,

    },
    password: {
        type: String,
        // require: true,
        trim: true,
        minLength: [
            8,
            'Password must not  be less than 8 charchters',
        ],
        validate: [validator.isStrongPassword, 'Password is not strong'],
        select: false,
    }

});
const EmployeeModel = mongoose.model<IEmployee>('employee', employeeSchema);

export default EmployeeModel;