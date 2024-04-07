const express = require("express");
const product = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(product.findAll)
    .post(product.create)
    .delete(product.deleteAll);

router.route("/:id")
    .get(product.findOne)
    .put(product.update)
    .delete(product.delete);

module.exports = router;