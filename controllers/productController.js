const Product = require('../models/Product.js')


// Get All Products
const getProducts = (req, res) => {
     Product.find({})/* .select('name description -_id') */
     .then(products => res.json(products))
     .catch(() => res.sendStatus(500));
}

// Get All Active Products
const getActiveProducts = (req, res) => {
     Product.find({isActive: true})
     .then(activeProducts => res.json(activeProducts))
     .catch(() => res.sendStatus(500));
}

// Get Single Product
const getProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          if(!product)
          return res.status(400).json("Product not found");

          res.json(product);
     })
     .catch(err => res.status(400).json(err.message));
}

// Add Product
const addProduct = (req, res) => {
     const product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
     })

     product.save()
     .then(newProduct => res.json(newProduct))
     .catch(err => res.status(400).json(err.message));
}

// Delete Product
const deleteProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          if(!product)
          return res.status(400).json("Product not found");

          product.deleteOne();
          res.json("Successfully Deleted Product");
     })
     .catch(err => res.status(400).json(err.message));
}

// Update Product
const updateProduct = (req, res) => {
    const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }

    Product.findByIdAndUpdate(req.params.id, updatedProduct, {new: true})
    .then(result => {
       if(!result)
       return res.status(400).json("Product not found");

       res.json(result);
    })
    .catch(err => res.status(400).json(err.message));
}

// Archive Product (isActive -> false)
const archiveProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          product.isActive = false
          product.save()
          .then(updatedProduct => res.json(updatedProduct))
          .catch(() => res.sendStatus(500));
     })
     .catch(err => res.status(400).json(err.message));
}

// Activate Product (isActive -> true)
const activateProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          product.isActive = true
          product.save()
          .then(updatedProduct => res.json(updatedProduct))
          .catch(() => res.sendStatus(500));
     })
     .catch(err => res.status(400).json(err.message));
}


module.exports = {
     getProducts,
     getActiveProducts,
     getProduct,
     addProduct,
     deleteProduct,
     updateProduct,
     archiveProduct,
     activateProduct
}