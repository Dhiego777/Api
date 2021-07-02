const express = require('express');
const product = require('../controllers/product');

const router = express.Router();

router
    .get("/products", product.getAll)
    .get("/product", product.getOne)
    .post("/product", product.create)
    .delete("/product", product.delete)
    .put("/product", product.edit)



module.exports = router;