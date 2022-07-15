import { Router } from "express";
import authRouter from "./auth.route";
import doctorRouter from "./doctor.route";
import employeeRouter from "./employee.route";
import medicineRouter from "./medicine.route";
import bookingRoute from "./../routes/booking.route";

const indexRouter = Router();

indexRouter.use("/doctor", doctorRouter);
indexRouter.use("/employee", employeeRouter);
indexRouter.use("/medicine", medicineRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/api/v1/booking", bookingRoute);

export default indexRouter;
