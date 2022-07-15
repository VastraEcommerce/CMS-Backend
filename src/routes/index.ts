import { Router } from 'express';
import doctorRouter from './doctor.route';
import employeeRouter from './employee.route';
import medicineRouter from './medicine.route';

const indexRouter = Router();

indexRouter.use('/doctor', doctorRouter);
indexRouter.use('/employee', employeeRouter);
indexRouter.use('/medicine', medicineRouter);

export default indexRouter;
