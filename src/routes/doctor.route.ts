import express from 'express';
import { getAllDoctors, createDoctor, getDoctor, updateDoctor, deleteDoctor } from '../controllers/doctor.controller';

const doctorRouter = express.Router();

doctorRouter.route("/doctor").get(getAllDoctors).post(createDoctor);
doctorRouter.route("/doctor/:id").get(getDoctor).put(updateDoctor).delete(deleteDoctor);

export default doctorRouter;