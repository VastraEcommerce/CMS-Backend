import express from 'express';
import {
  getAllDoctors,
  createDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctor.controller';

const doctorRouter = express.Router();

doctorRouter.route('/').get(getAllDoctors).post(createDoctor);
doctorRouter
  .route('/:id')
  .get(getDoctor)
  .put(updateDoctor)
  .delete(deleteDoctor);

export default doctorRouter;
