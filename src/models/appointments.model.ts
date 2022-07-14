import { Model, Schema, Types, model, HydratedDocument } from 'mongoose';
import validator from 'validator';
import IInvoice from '../schemas/invoice.schema';
import IPrescription from '../schemas/prescription.schema';


interface IAppointment {
    date: Date;
    doctor?: Types.ObjectId;
    examinationId?: Types.ObjectId | null;
    invoice: IInvoice,
    prescription: IPrescription,
}

interface IAppointmentMethods {
    fullName(): string;
}

interface AppointmentModel extends Model<IAppointment, {}, IAppointmentMethods> {
    createWithFullName(name: string): Promise<HydratedDocument<IAppointment, IAppointmentMethods>>;
}

const schema = new Schema<IAppointment, AppointmentModel, IAppointmentMethods>({
    date: { type: Date, required: true },
    doctor: { type: Schema.Types.ObjectId, required: true },
    examinationId: { type: Schema.Types.ObjectId },
    invoice: { required: true },
    prescription: { required: true },



}, {
    timestamps: true
});
schema.static('createWithFullName', function createWithFullName(name: string) {
    const [firstName, lastName] = name.split(' ');
    return Appointment.create({ firstName, lastName });
});
schema.method('fullName', function fullName(): string {
    return this.firstName + ' ' + this.lastName;
});

const Appointment = model<IAppointment, AppointmentModel>('Appointment', schema);