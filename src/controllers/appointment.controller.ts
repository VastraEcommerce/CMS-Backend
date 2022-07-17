import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
// import { ConsoleReporter } from "jasmine";
import Appointment, { IAppointment } from "../models/appointment.model";
import AppError from "../utils/AppError";

export const getAllAppointments = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const appointments = await Appointment.find({});
        res.status(200).json({
            message: "Success",
            data: {
                appointments,
            },
        });
    }
);
export const createAppointment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;
        const isAvailable = await Appointment.isAvailable(body as IAppointment);
        if (isAvailable) {
            await Appointment.create(body);
            res.status(201).json({
                message: "Success",
                data: "Created",
            });
        } else {
            next(new AppError("Appointment is not available", StatusCodes.CONFLICT));
        }
    }
);

export const getAppointment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const appointment = await Appointment.findById(id);
        res.status(201).json({
            message: "Success",
            data: appointment,
        });
    }
);
export const updateAppointment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const appointment = req.body;
        await Appointment.findByIdAndUpdate(id, appointment, {
            runValidators: true,
        });
        res.status(201).json({
            message: "Success",
            data: "Updated",
        });
    }
);
export const deleteAppointment = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        await Appointment.findByIdAndDelete(id);
        res.status(201).json({
            message: "Success",
            data: "Deleted",
        });
    }
);
export const getAppointmentsByDay = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const day = req.params.day || new Date().toISOString();

        const aps = await Appointment.find().byDay(day);

        res.status(200).json({
            message: "Success",
            data: aps,
        });
    }
);

export const updateAppointmentPrescription = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const prescription = req.body;

        const app = await Appointment.findByIdAndUpdate(id, { prescription }, { runValidators: true });

        res.status(StatusCodes.OK).json({
            message: "Success",
            data: "Updated",
        });
    }
);

export const getReportsOfAppointmentAtDuration = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        const startTime = new Date(`${req.query.start}`);
        startTime.setHours(0, 0, 0, 0);
        const endTime = new Date(`${req.query.end}`);
        endTime.setHours(0, 0, 0, 0);
        const aps = await Appointment.find({
            date: {
                $gte: startTime,
                $lt: endTime,
            }
        }, null, { sort: { date: 1 } });

        res.status(200).json({
            message: "Success",
            data: aps,
        });
    }
);