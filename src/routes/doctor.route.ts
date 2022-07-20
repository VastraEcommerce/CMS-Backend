import express from "express";
import {
  getAllDoctors,
  createDoctor,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctor.controller";
import { admin } from "../middlewares/auth/protect.middleware";

const doctorRouter = express.Router();

doctorRouter.route("/").get(getAllDoctors).post(admin, createDoctor);
doctorRouter
  .route("/:id")
  .get(getDoctor)
  .put(admin, updateDoctor)
  .delete(admin, deleteDoctor);

export default doctorRouter;
