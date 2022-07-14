import cors from 'cors';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import medicineRouter from './routes/medicine.route';
import notFound from './middlewares/notFound.middleware';
import errorHandler from './middlewares/error.middleware';
dotenv.config();

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI

const app = express();


app.use(helmet()); // Set security HTTP headers
app.use(helmet.xssFilter()); // XSS-Protection


// Development logging
if (process.env.NODE_ENV === 'development') {
    console.log('Start Development');
    app.use(morgan('dev'));
} else {
    console.log('Strat Production');
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Allow cross origins
app.use(cors());
app.use(medicineRouter);
app.use(notFound);
app.use(errorHandler);


// Connecting to the Database
mongoose
    .connect(DB_URI!)
    .then(() =>
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    )
    .catch((error: Error) => {
        console.log('Database Connection failed');
        console.error(error.message)
    });



export default app;
