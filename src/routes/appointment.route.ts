import express from 'express';
import {
  getAllAppointments,
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByDay,
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
  .route('/:id/prescription')

export default appointmentRouter;
