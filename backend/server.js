import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000 ;
const app = express();

//Connect DB 
connectDB();

//Start app
app.get('/', (req, res)=> {
    res.send('API is running...');
});

//Get products
app.get('/api/products',(req,res)=>{
    res.json(products);
});

//Get product
app.get('/api/products/:id',(req,res)=>{
    const product = products.find(p => p._id === req.params.id);
    res.json(product);
})
app.listen(port, () => console.log(`Server running on port ${port}`));