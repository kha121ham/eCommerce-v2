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
// @route   PUT api/products/:id
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

// @desc    Delete a product
// @route   DELETE api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Product deleted' });
    } else {
        res.status(404);
        throw new Error('resource not found');
    }
});


// @desc    Create a new review
// @route   POST api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async(req,res)=> {

    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = 
        product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404);
        throw new Error('resource not found');
    }
});

export { getProducts,getProductById, createProduct, updateProduct, deleteProduct, createProductReview };