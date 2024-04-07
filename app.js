const express = require("express");
const cors = require("cors");
const accountsRouter = require("./app/routes/account.route");
const productsRouter = require("./app/routes/product.route");
const cartsRouter = require("./app/routes/cart.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/accounts", accountsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("/", (req, res) => {
    res.json({ message: "Welcome!" });
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;