import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Medicine from '../models/medicine.model'


export const getAllMedicines = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const medicines = await Medicine.find({});
    res.status(200).json({
        message: "Success",
        data: {
            medicines
        }
    })

})
export const createMedicine = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body
    console.log(body)
    await Medicine.create(body)
    res.status(201).json({
        message: "Success", data:
            "Created"
    })


})