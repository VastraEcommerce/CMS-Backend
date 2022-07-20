import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Medicine from "../models/medicine.model";

export const getAllMedicines = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let medicines;
    const { name } = req.query;
    if (name) {
      medicines = await Medicine.find({
        name: { $regex: name, $options: "$i" },
      });
    } else {
      medicines = await Medicine.find({});
    }
    res.status(200).json({
      message: "Success",
      data: {
        medicines,
      },
    });
  }
);
export const createMedicine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    console.log(body);
    await Medicine.create(body);
    res.status(201).json({
      message: "Success",
      data: "Created",
    });
  }
);

export const getMedicine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const medicine = await Medicine.findById(id);
    res.status(201).json({
      message: "Success",
      data: medicine,
    });
  }
);
export const updateMedicine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const medicine = req.body;
    await Medicine.findByIdAndUpdate(id, medicine, { runValidators: true });
    res.status(201).json({
      message: "Success",
      data: "Updated",
    });
  }
);
export const deleteMedicine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    await Medicine.findByIdAndDelete(id);
    res.status(201).json({
      message: "Success",
      data: "Deleted",
    });
  }
);
