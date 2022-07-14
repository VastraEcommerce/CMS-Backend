import mongoose, { Schema, Types } from 'mongoose';
import validator from 'validator';
import profileSchema, { IProfile } from '../schemas/porfile.schema';

export interface IEmployee {

    profile: IProfile;
    department: string;
    role: "user" | "admin";
    password: string;
}

const employeeSchema = new mongoose.Schema<IEmployee>({

    profile: {
        type: profileSchema,
        required: true,

    },
    department: {
        type: String,
        required: true,
        validate: [validator.isAlpha, 'Please Enter the department']
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"]

    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: [validator.isStrongPassword, 'Password is not strong'],
        select: false,
    }

});
const EmployeeModel = mongoose.model<IEmployee>('employee', employeeSchema);

export default EmployeeModel;