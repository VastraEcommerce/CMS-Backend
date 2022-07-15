import express from 'express';
import {
  getAllEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller';

const employeeRouter = express.Router();

employeeRouter.route('/').get(getAllEmployees).post(createEmployee);
employeeRouter
  .route('/:id')
  .get(getEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

export default employeeRouter;
