const express = require("express");
const products = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAll)
    .post(products.create)
    .delete(products.deleteAll);

router.route("/featured")
    .get(products.findAllFeatured);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

module.exports = router;