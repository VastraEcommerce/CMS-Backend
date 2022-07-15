import mongoose, { Model, Schema, Types } from 'mongoose';
import validator from 'validator';
import profileSchema, { IProfile } from '../schemas/porfile.schema';
import argon2 from "argon2"

export interface IEmployee {

    profile: IProfile;
    department: string;
    role: "user" | "admin";
    password: string;
    passwordConfirm: string;
}

interface IEmployeeMethods {
    verifyPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

interface IEmployeeModel extends Model<IEmployee, {}, IEmployeeMethods> {

}

const employeeSchema = new mongoose.Schema<IEmployee, IEmployeeModel, IEmployeeMethods>({

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
        required: [true, "Password can not be empty"],
        trim: true,
        validate: [validator.isStrongPassword, 'Password is not strong'],
        select: false,
        minLength: [8, 'Password must have more than or equal to 8 characters',],
    },
    passwordConfirm: {
        type: String,
        required: [true, "Password confirm can not be empty"],
        trim: true,
        validate: {
            validator: function (val: string) {
                return val === (this as unknown as IEmployee).password;
            },
            message: 'Passwords are not matched'
        },
        select: false,
    }

});


employeeSchema.pre('save', async function (next) {
    //  Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hashing password with argon2
    this.password = await argon2.hash(this.password);

    // Delete password confirm value from the database
    (this.passwordConfirm as unknown as undefined) = undefined;

    return next();
});

employeeSchema.method("verifyPassword", function verifyPassword(candidatePassword: string, userPassword: string) {

    return argon2.verify(userPassword, candidatePassword);
})



const EmployeeModel = mongoose.model<IEmployee, IEmployeeModel>('employee', employeeSchema);

export default EmployeeModel;