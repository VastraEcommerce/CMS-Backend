import express from 'express';
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';
import { admin } from '../middlewares/auth/protect.middleware';

const employeeRouter = express.Router();

employeeRouter.route('/').get(getAllEmployees).post(admin, createEmployee);
employeeRouter
  .route('/:id')
  .get(getEmployee)
  .put(admin, updateEmployee)
  .delete(admin, deleteEmployee);

export default employeeRouter;
