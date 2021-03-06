import Doctor from '../models/doctor.model';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ObjectId, Types } from 'mongoose';

export const getAllDoctors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctors = await Doctor.find({});
    console.log(doctors[0].appointmentsCount);
    res.status(200).json({
      message: 'Success',
      data: {
        doctors,
      },
    });
  }
);

export const getDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    res.status(200).json({
      message: 'Success',
      data: {
        doctor,
      },
    });
  }
);

export const createDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Doctor.create(req.body);
    res.status(201).json({
      message: 'Success',
      data: 'Created',
    });
  }
);
export const updateDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Doctor.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: 'Success',
      data: 'Updated',
    });
  }
);
export const deleteDoctor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: 'Success',
      data: 'Deleted',
    });
  }
);

// export const getDoctorByName: Promise<ObjectId> = asyncHandler(async (req: Request, res?: Response, next: NextFunction) => {
//     const { name } = req.params;
//     const doctor = await Doctor.findById(name);
//     const doctorId = doctor?._id;
//     return doctorId;
// });
