import express from 'express';
import {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDate
} from '../controllers/appointment.controller';

const appointmentRouter = express.Router();

appointmentRouter.route('/').get(getAllAppointments).post(createAppointment);
appointmentRouter
  .route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

appointmentRouter.get("/date/:date", getAppointmentsByDate)

export default appointmentRouter;
