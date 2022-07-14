import express from 'express'
import { getAllMedicines, createMedicine } from '../controllers/medicine.controller'


const medicineRouter = express.Router()

medicineRouter.route("/medicine").get(getAllMedicines).post(createMedicine)

export default medicineRouter