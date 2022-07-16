import express from 'express';
import {
  getAllMedicines,
  createMedicine,
  getMedicine,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicine.controller';
import { admin } from '../middlewares/auth/protect.middleware';

const medicineRouter = express.Router();

medicineRouter.route('/').get(getAllMedicines).post(admin, createMedicine);
medicineRouter
  .route('/:id')
  .get(getMedicine)
  .put(admin, updateMedicine)
  .delete(admin, deleteMedicine);

export default medicineRouter;
