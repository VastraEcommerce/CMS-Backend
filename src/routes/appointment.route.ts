import express from 'express';
import {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDay,
  updateAppointmentPrescription
} from '../controllers/appointment.controller';

const appointmentRouter = express.Router();

appointmentRouter.route('/').get(getAllAppointments).post(createAppointment);
appointmentRouter
  .route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

appointmentRouter.get('/date/day/:day?', getAppointmentsByDay);
appointmentRouter
  .post('/:id/prescription', updateAppointmentPrescription)

export default appointmentRouter;
