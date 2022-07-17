import { Router } from 'express';
import { protect } from '../middlewares/auth/protect.middleware';
import authRouter from './auth.route';
import doctorRouter from './doctor.route';
import employeeRouter from './employee.route';
import medicineRouter from './medicine.route';
import appointmentRouter from './appointment.route';
<<<<<<< HEAD
import bookingRoute from './../routes/booking.route';
import patientRoute from './../routes/patient.route';
=======
import bookingRoute from "./../routes/booking.route";
import patientRoute from "./../routes/patient.route";
import reportsRouter from "./../routes/reports.route";

>>>>>>> 7dfc537a39a84c7e1c0715f329ec5c06d1039d57

const indexRouter = Router();


// Public
indexRouter.use('/auth', authRouter);

// Private
indexRouter.use(protect);
indexRouter.use('/doctor', doctorRouter);
indexRouter.use('/employee', employeeRouter);
indexRouter.use('/medicine', medicineRouter);
indexRouter.use('/appointment', appointmentRouter);
<<<<<<< HEAD
indexRouter.use('/booking', bookingRoute);
indexRouter.use('/patient', patientRoute);
=======
indexRouter.use("/booking", bookingRoute);
indexRouter.use("/patient", patientRoute);
indexRouter.use("/reports", reportsRouter);
>>>>>>> 7dfc537a39a84c7e1c0715f329ec5c06d1039d57

export default indexRouter;
