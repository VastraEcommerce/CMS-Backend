import mongoose, { Schema, Types, InferSchemaType } from 'mongoose';
import validator from 'validator';
import profileSchema, { IProfile } from '../schemas/porfile.schema';

export interface IDoctor {

    profile: IProfile;
    specialzation: string;
    workingHours: IWorkingHours,
    appointmentDuration: number
    appointmentsCount: number
}

interface Time {
    h: number;
    m: number;
}

interface IWorkingHours {
    from: Time;
    to: Time;
}
const timeSchema = new mongoose.Schema<Time>({
    h: {
        type: Number,
        min: 1,
        max: 24,
        required: [true, "Hour is required"]
    },
    m: {
        type: Number,
        min: 0,
        max: 59,
        default: 0
    },
}, { _id: false })

const workingHoursSchema = new mongoose.Schema<IWorkingHours>({
    from: {
        type: timeSchema,
        required: [true, "Provied doctor's working hours"],

    },
    to: {
        type: timeSchema,
        required: [true, "Provied doctor's working hours"],

    }

}, { _id: false, toJSON: { virtuals: true }, })

const doctorSchema = new mongoose.Schema<IDoctor>({

    profile: {
        type: profileSchema,
        required: true,

    },
    specialzation: {
        type: String,
        required: true,
        validate: [validator.isAlpha, 'Please Enter the Speclization']
    },
    workingHours: {
        type: workingHoursSchema,
        validate: [(elem: IWorkingHours) => elem.from.h * 60 + elem.from.m < elem.to.h * 60 + elem.to.m, "Working hours can not be less than 0"],
        // set: (whs: IWorkingHours) => {
        //     return (whs.to.h - whs.from.h) * 60 + (whs.to.m - whs.from.m)
        // }
    },
    appointmentDuration: {
        type: Number,
        required: [true, "Appointment duration can not be empty"]
    }

}, { timestamps: true });

doctorSchema.virtual('appointmentsCount').get(function () {
    return Math.floor(
        ((this.workingHours.to.h - this.workingHours.from.h) * 60 +
            (this.workingHours.to.m - this.workingHours.from.m)) / this.appointmentDuration
    );
});


const DoctorModel = mongoose.model<IDoctor>('doctor', doctorSchema);

export default DoctorModel;