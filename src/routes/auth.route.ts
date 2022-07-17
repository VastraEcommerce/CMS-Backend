import express from 'express';
import { login } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.route('/login').post(login);

export default authRouter;
