import { HydratedDocument, Model, model, Schema, Types } from "mongoose";
import invoiceSchema, { IInvoice } from "../schemas/invoice.schema";
import prescriptionRecordSchema, {
  IPrescriptionRecord,
} from "../schemas/prescriptionRecord.schema";

interface IAppointment {
  patientId: Types.ObjectId;
  date: Date;
  doctor: Types.ObjectId;
  examinationId?: Types.ObjectId | null;
  invoice: IInvoice;
  prescription: IPrescriptionRecord[];
}

interface IAppointmentMethods {
  updatePrescription(prescription: IPrescriptionRecord[]): Promise<void>;
}

interface AppointmentModel
  extends Model<IAppointment, {}, IAppointmentMethods> {
  getAppointmentsByDate(
    date: Date
  ): Promise<HydratedDocument<IAppointment, IAppointmentMethods>>;
}

const schema = new Schema<IAppointment, AppointmentModel, IAppointmentMethods>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    examinationId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    invoice: { type: invoiceSchema, required: true },
    prescription: [{ type: prescriptionRecordSchema, required: true }],
  },
  {
    timestamps: true,
  }
);
// schema.static(
//   "getAppointmentsByDate",
//   function getAppointmentsByDate(date: Date) {
//     const dd = Appointment.find({ date });
//     return dd;
//   }
// );

// schema.method(
//   "updatePrescription",
//   function updatePrescription(prescription: IPrescriptionRecord[]): void {
//     this.prescription = prescription;
//     this.save();
//   }
// );

const Appointment = model<IAppointment, AppointmentModel>(
  "Appointment",
  schema
);

export default Appointment;
