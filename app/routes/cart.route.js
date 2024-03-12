const express = require("express");
const cart = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .get(cart.findAll)
    .post(cart.create)
    .delete(cart.deleteAll);

router.route("/:id")
    .get(cart.findOne)
    .put(cart.update)
    .delete(cart.delete);

module.exports = router;