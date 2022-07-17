import { HydratedDocument, Model, model, Query, Schema, Types } from "mongoose";
import invoiceSchema, { IInvoice } from "../schemas/invoice.schema";
import prescriptionRecordSchema, {
  IPrescriptionRecord,
} from "../schemas/prescriptionRecord.schema";

export interface IAppointment {
  patientId: Types.ObjectId;
  date: Date;
  doctor: Types.ObjectId;
  examinationId?: Types.ObjectId | null;
  invoice: IInvoice;
  prescription: Types.DocumentArray<IPrescriptionRecord>;
  appointmentNumber: number;
}

interface IAppointmentMethods {
  updatePrescription(prescription: Types.DocumentArray<IPrescriptionRecord>): Promise<void>;
}

type AppointmentModelQuery = Query<any, HydratedDocument<IAppointment>, AppointmentQueryHelpers> & AppointmentQueryHelpers;
interface AppointmentQueryHelpers {
  byDay(this: AppointmentModelQuery, date: string): AppointmentModelQuery;
  byStartEndDate(this: AppointmentModelQuery, Startdate: any, endDate: any): AppointmentModelQuery;
}

interface AppointmentModel
  extends Model<IAppointment, AppointmentQueryHelpers, IAppointmentMethods> {
  isAvailable(
    appointment: any
    // date: Date, doctor: Types.ObjectId, appointmentNumber: number
  ): Promise<boolean>;
  // ): Promise<HydratedDocument<IAppointment, IAppointmentMethods>>;
}

const schema = new Schema<IAppointment, AppointmentModel, IAppointmentMethods, AppointmentQueryHelpers>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    date: { type: Date, required: true },
    doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    examinationId: { type: Schema.Types.ObjectId, ref: "Appointment" },
    invoice: { type: invoiceSchema, required: true },
    prescription: [{ type: prescriptionRecordSchema, required: true }],
    appointmentNumber: { type: Number, requied: [true, "Appointment number must be provided"] }

  },
  {
    timestamps: true,
  }
);

schema.query.byDay = function (date: string): AppointmentModelQuery {
  const day = date.split("T")[0]; //to sure that format will be like "2020-07-16"

  return this.find({
    date: {
      $gte: `${day}T00:00:00.000Z`,
      $lt: `${day}T23:59:59.999Z`,
    },
  });
};


schema.static(
  "isAvailable",
  async function isAvailable(appointment: IAppointment) {

    const { date, doctor, appointmentNumber } = appointment;

    return await Appointment.findOne({ doctor, appointmentNumber }).byDay(date as unknown as string).countDocuments() ? false : true;
  }
);

// schema.method(
//   "updatePrescription",
//   function updatePrescription(prescription: Types.DocumentArray<IPrescriptionRecord>) {
//     this.prescription = prescription;
//     return this.save();
//   }
// );

const Appointment = model<IAppointment, AppointmentModel>(
  "Appointment",
  schema
);

export default Appointment;
