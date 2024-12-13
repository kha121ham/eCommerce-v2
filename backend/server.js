import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000 ;
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const app = express();

//Connect DB 
connectDB();

//Start app
app.get('/', (req, res)=> {
    res.send('API is running...');
});

//Define routes
app.use('/api/products', productRoutes);

//error middleware
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));