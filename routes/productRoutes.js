const express = require("express");
const { updateProduct, createProduct, getAllProduct, getProductById, deleteProduct } = require("../controller/productController");

const router = express.Router();

router.put("/:id", updateProduct);
router.post("/" , createProduct);
router.get("/" , getAllProduct);
router.get("/:id" , getProductById)
router.delete("/:id" , deleteProduct)


module.exports = router;