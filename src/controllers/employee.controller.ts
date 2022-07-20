import Employee from "../models/employee.model";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const getAllEmployees = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let employees;
    let { name } = req.query;
    if (name) {
      employees = await Employee.find({
        "profile.name": { $regex: name, $options: "$i" },
      });
    } else {
      employees = await Employee.find({});
    }

    res.status(200).json({
      message: "Success",
      data: {
        employees,
      },
    });
  }
);

export const getEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    res.status(200).json({
      message: "Success",
      data: {
        employee,
      },
    });
  }
);

export const createEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Employee.create(req.body);
    res.status(201).json({
      message: "Success",
      data: "Created",
    });
  }
);
export const updateEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "Success",
      data: "Updated",
    });
  }
);
export const deleteEmployee = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Success",
      data: "Deleted",
    });
  }
);
