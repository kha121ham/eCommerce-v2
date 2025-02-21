import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000 ;
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import uploadRoutes from './routes/uploadRoutes.js';
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie parser middleware
app.use(cookieParser());

//Connect DB 
connectDB();

//Start app
app.get('/', (req, res)=> {
    res.send('API is running...');
});

//Define routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//PayPal setup
app.get('/api/config/paypal', (req,res)=> res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

//Set __dirname to current dir
const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

//error middleware
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));