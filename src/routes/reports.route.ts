import express from 'express';
import { getReportsOfAppointmentAtDuration } from '../controllers/appointment.controller';

const reportsRouter = express.Router();
reportsRouter.route('/reports/appointments/').get(getReportsOfAppointmentAtDuration);

export default reportsRouter;
