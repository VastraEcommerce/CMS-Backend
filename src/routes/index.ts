import { Router } from 'express';
import { protect } from '../middlewares/auth/protect.middleware';
import authRouter from './auth.route';
import doctorRouter from './doctor.route';
import employeeRouter from './employee.route';
import medicineRouter from './medicine.route';
import appointmentRouter from './appointment.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use(protect);
indexRouter.use('/doctor', doctorRouter);
indexRouter.use('/employee', employeeRouter);
indexRouter.use('/medicine', medicineRouter);
indexRouter.use('/appointment', appointmentRouter);

export default indexRouter;
