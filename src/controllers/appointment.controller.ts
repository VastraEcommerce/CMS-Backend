import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Appointment from '../models/appointment.model';

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
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);
    await Appointment.create(body);
    res.status(201).json({
      message: 'Success',
      data: 'Created',
    });
  }
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

    console.log(req.params.day, '🎈🎈');

    const targetDay = day.split('T')[0]; //to sure that format will be like "2020-07-16"
    const aps = await Appointment.find({
      date: {
        $gte: `${targetDay}T00:00:00.000Z`,
        $lt: `${targetDay}T23:59:59.999Z`,
      },
    });

    res.status(200).json({
      message: 'Success',
      data: aps,
    });
  }
);
