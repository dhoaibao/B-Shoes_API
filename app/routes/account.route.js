const express = require("express");
const accounts = require("../controllers/account.controller");

const router = express.Router();

router.route("/")
    .get(accounts.findAll)
    .post(accounts.create)
    .delete(accounts.deleteAll);

router.route("/:id")
    .get(accounts.findOne)
    .put(accounts.update)
    .delete(accounts.delete);

module.exports = router;