import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import AppError from '../../utils/AppError';

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

interface CustomRequest extends Request {
  user?: {
    id: Types.ObjectId;
    role: 'admin' | 'user';
  };
}

export const protect = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    // Check if the request has authorization header and it begins with "Bearer"
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token)
      return next(
        new AppError(
          'You are not logged in! Please log in to get access.',
          StatusCodes.UNAUTHORIZED
        )
      );

    // Verify JWT

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    console.log(decoded);

    req.user = { id: decoded.id, role: decoded.role };

    next();
  }
);

export const admin = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== 'admin') {
      return next(
        new AppError(
          'You are not authorized. Admin access only',
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  }
);

export const currentUser = asyncHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.id.toString() !== req.params.id) {
      return next(
        new AppError(
          'You are not authorized. Admin access only',
          StatusCodes.UNAUTHORIZED
        )
      );
    }
    next();
  }
);
