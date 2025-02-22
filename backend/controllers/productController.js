import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js'

// @desc    Fetch All Products
// @route   Get api/products
// @access  Public
const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products);
});

// @desc    Fetch a Product
// @route   Get api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);
    
    if(product) {
        return res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Resource Not Found');
    }
});

// @desc    Create a product
// @route   POST api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req,res)=>{
    const product = new Product({
        name: 'sample name',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description,'
    });
    const createProduct = await product.save();
    res.status(201).json(createProduct);
});


// @desc    Update a product
// @route   PUT api/products
// @access  Private/Admin
const updateProduct = asyncHandler(async (req,res)=>{
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { getProducts,getProductById, createProduct, updateProduct };