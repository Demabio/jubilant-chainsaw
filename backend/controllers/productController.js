import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import productCatModel from "../models/catsModel.js";
import typesModel from "../models/typesModel.js";
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all products
// @route   GET /api/getCats
// @access  Public
const getCats = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await productCatModel.countDocuments({ ...keyword });
  const cats = await productCatModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ cats, page, pages: Math.ceil(count / pageSize) });
});
// @desc    Fetch all types
// @route   GET /api/getTypes
// @access  Public
const getTypes = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await typesModel.countDocuments({ ...keyword });
  const types = await typesModel
    .find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ types, page, pages: Math.ceil(count / pageSize) });
});
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Fetch single type
// @route   GET /api/getTypeById/:id
// @access  Public
const getTypeById = asyncHandler(async (req, res) => {
  const type = await typesModel.findById(req.params.id);

  if (type) {
    res.json(cat);
  } else {
    res.status(404);
    throw new Error("Type not found");
  }
});
// @desc    Fetch single product
// @route   GET /api/getCatById/:id
// @access  Public
const getCatById = asyncHandler(async (req, res) => {
  const cat = await productCatModel.findById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Delete a type
// @route   DELETE /api/deleteType/:id
// @access  Private/Admin
const deleteType = asyncHandler(async (req, res) => {
  const type = await typesModel.findById(req.params.id);

  if (type) {
    await type.remove();
    res.json({ message: "Tpe removed" });
  } else {
    res.status(404);
    throw new Error("Type not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/deletecats/:id
// @access  Private/Admin
const deleteCats = asyncHandler(async (req, res) => {
  const cat = await productCatModel.findById(req.params.id);

  if (cat) {
    await cat.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Update a Cat
// @route   PUT /api/updateCat/:id
// @access  Private/Admin
const updateCat = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const cat = await productCatModel.findById(req.params.id);

  if (cat) {
    cat.name = name;

    const updatedCat = await ProductCatModel.save();
    res.json(updatedCat);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});
// @desc    Update a Type
// @route   PUT /api/updateTypes/:id
// @access  Private/Admin
const updateTypes = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const type = await typesModel.findById(req.params.id);

  if (type) {
    type.name = name;

    const updatedType = await typesModel.save();
    res.json(updatedType);
  } else {
    res.status(404);
    throw new Error("Type not found");
  }
});
// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
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
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
// @desc    Register a new category
// @route   POST /api/cats
// @access  Public
const addCats = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //validate if cat exists
  const catsExists = await productCatModel.findOne({ name });

  if (catsExists) {
    res.status(400);
    throw new Error("Category already Exists");
  }

  const pCat = await productCatModel.create({
    name,
  });

  if (pCat) {
    res.status(201).json({
      _id: pCat._id,
      name: pCat.name,
      token: generateToken(pCat._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Request");
  }
});
// @desc    Register a new Type
// @route   POST /api/addTypes
// @access  Public
const addTypes = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //validate if cat exists
  const typeExists = await typesModel.findOne({ name });

  if (typesExists) {
    res.status(400);
    throw new Error("Type already Exists");
  }

  const pType = await typesModel.create({
    name,
  });

  if (pType) {
    res.status(201).json({
      _id: pType._id,
      name: pType.name,
      token: generateToken(pType._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Request");
  }
});
// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  //cats
  addCats,
  deleteCats,
  updateCat,
  getCatById,
  getCats,
  // types
  addTypes,
  deleteType,
  updateTypes,
  getTypeById,
  getTypes,
};
