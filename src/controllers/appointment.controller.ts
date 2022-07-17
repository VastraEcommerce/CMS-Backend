<<<<<<< HEAD
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointment.model';
=======
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
// import { ConsoleReporter } from "jasmine";
import Appointment, { IAppointment } from "../models/appointment.model";
import AppError from "../utils/AppError";
>>>>>>> 7dfc537a39a84c7e1c0715f329ec5c06d1039d57

export const getAllAppointments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const appointments = await Appointment.find({});
    res.status(200).json({
      message: 'Success',
      data: {
        appointments,
      },
    });
  }
);
export const createAppointment = asyncHandler(
<<<<<<< HEAD
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);
    await Appointment.create(body);
    res.status(201).json({
      message: 'Success',
      data: 'Created',
    });
  }
=======
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
>>>>>>> 7dfc537a39a84c7e1c0715f329ec5c06d1039d57
);

export const getAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    res.status(201).json({
      message: 'Success',
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
      message: 'Success',
      data: 'Updated',
    });
  }
);
export const deleteAppointment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await Appointment.findByIdAndDelete(id);
    res.status(201).json({
      message: 'Success',
      data: 'Deleted',
    });
  }
);
export const getAppointmentsByDay = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const day = req.params.day || new Date().toISOString();

<<<<<<< HEAD
    console.log(req.params.day, '🎈🎈');

    const targetDay = day.split('T')[0]; //to sure that format will be like "2020-07-16"
    const aps = await Appointment.find({
      date: {
        $gte: `${targetDay}T00:00:00.000Z`,
        $lt: `${targetDay}T23:59:59.999Z`,
      },
    });
=======
        const aps = await Appointment.find().byDay(day);
>>>>>>> 7dfc537a39a84c7e1c0715f329ec5c06d1039d57

    res.status(200).json({
      message: 'Success',
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