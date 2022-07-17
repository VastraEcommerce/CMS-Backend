import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import EmployeeModel from '../models/employee.model';
import AppError from '../utils/AppError';

const SECRET_KEY = process.env.JWT_SECRET_KEY!;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN!;
const JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN!;

const signToken = (id: Types.ObjectId, role: 'admin' | 'user') =>
  jwt.sign({ id, role }, SECRET_KEY, { expiresIn: EXPIRES_IN });

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user email and password from the  request body
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password)
      next(
        new AppError(
          'Please provide email and password!',
          StatusCodes.BAD_REQUEST
        )
      );

    const user = await EmployeeModel.findOne({ email }).select('+password');

    // Check if the password provided is correct
    const isCorrectPassword = await user?.verifyPassword(
      password,
      user.password
    );

    // Check if user doesn't exist or the password is wrong
    if (!user || !isCorrectPassword)
      return next(
        new AppError('Incorrect email or password', StatusCodes.UNAUTHORIZED)
      );

    // Generating token signed with the user ID and role
    const token = signToken(user.id, user.role);

    // Sending the generated token in the json response
    res.status(StatusCodes.OK).json({
      message: 'Success',
      token,
    });
  }
);
