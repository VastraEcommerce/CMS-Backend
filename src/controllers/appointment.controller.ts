import { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Appointment from '../models/appointment.model'


export const getAllAppointments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const appointments = await Appointment.find({});
    res.status(200).json({
        message: "Success",
        data: {
            appointments
        }
    })

})
export const createAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const body = req.body
    console.log(body)
    await Appointment.create(body)
    res.status(201).json({
        message: "Success", data:
            "Created"
    })
})

export const getAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    const appointment = await Appointment.findById(id)
    res.status(201).json({
        message: "Success", data: appointment
    })
})
export const updateAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    const appointment = req.body
    await Appointment.findByIdAndUpdate(id, appointment, { runValidators: true, })
    res.status(201).json({
        message: "Success", data:
            "Updated"
    })
})
export const deleteAppointment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    await Appointment.findByIdAndDelete(id)
    res.status(201).json({
        message: "Success", data:
            "Deleted"
    })
})