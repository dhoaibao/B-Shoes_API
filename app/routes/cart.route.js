const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(carts.findAll)
    .post(carts.create)
    .delete(carts.deleteAll);

router.route("/:id")
    .get(carts.findOne)
    .put(carts.update)
    .delete(carts.delete);

module.exports = router;