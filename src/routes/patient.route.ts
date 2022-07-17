import express from 'express';
import {
    getAllPatients,
    createPatient,
    getPatient,
    updatePatient,
    deletePatient,
} from '../controllers/patient.controller';
import { admin } from '../middlewares/auth/protect.middleware';



const patientRouter = express.Router();

patientRouter.route('/').get(getAllPatients).post(createPatient);
patientRouter
    .route('/:id')
    .get(getPatient)
    .put(admin, updatePatient)
    .delete(admin, deletePatient);

export default patientRouter;
