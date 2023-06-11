const Product = require('../models/Product.js')



const getProducts = (req, res) => {
     Product.find({})
     .then(products => res.json(products))
     .catch(err => res.sendStatus(500));
}

const addProduct = (req, res) => {
     product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
     })

     product.save()
     .then(newProduct => res.json(newProduct))
     .catch(err => res.status(400).json(err.message));
}


const deleteProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          if(!product)
          return res.status(400).json("Product not found");

          product.deleteOne();
          res.json("Successfully Deleted Product");
     })
     .catch(err => res.status(400).json(err.message))
}

const updateProduct = (req, res) => {
    const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }

    Product.findByIdAndUpdate(req.params.id, updatedProduct, {new: true})
    .then(result => {
       if(!result)
       return res.status(400).json("Product not found")

       res.json(result);
    })
    .catch(err => res.status(400).json(err.message));
}


module.exports = {
     getProducts,
     addProduct,
     deleteProduct,
     updateProduct
}