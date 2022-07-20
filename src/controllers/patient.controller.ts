import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Patient from '../models/patient.model';

export const getAllPatients = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const patients = await Patient.find({});
    res.status(200).json({
      message: 'Success',
      data: {
        patients,
      },
    });
  }
);
export const createPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);
    await Patient.create(body);
    res.status(201).json({
      message: 'Success',
      data: 'Created',
    });
  }
);

export const getPatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const patient = await Patient.findById(id);
    res.status(201).json({
      message: 'Success',
      data: patient,
    });
  }
);
export const updatePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const patient = req.body;
    await Patient.findByIdAndUpdate(id, patient, { runValidators: true });
    res.status(201).json({
      message: 'Success',
      data: 'Updated',
    });
  }
);
export const deletePatient = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await Patient.findByIdAndDelete(id);
    res.status(201).json({
      message: 'Success',
      data: 'Deleted',
    });
  }
);
