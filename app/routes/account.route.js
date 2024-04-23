const express = require("express");
const account = require("../controllers/account.controller");

const router = express.Router();

router.route("/")
    .get(account.findAll)
    .post(account.create)
    .delete(account.deleteAll);

router.route("/:id")
    .get(account.findOne)
    .put(account.update)
    .delete(account.delete);

router.route("/phone/:phone")
    .get(account.findPhone);

module.exports = router;