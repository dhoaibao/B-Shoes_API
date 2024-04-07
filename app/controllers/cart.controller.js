const CartService = require("../services/cart.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the cart")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];

    try {
        const cartService = new CartService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await cartService.findByName(name);
        } else {
            document = await cartService.find({});
        }
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while retrieving cart")
        );
    }

    return res.send(document);
};

exports.findOne = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Cart not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving cart with id=${req.params.id}`)
        )
    };
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Cart not found"));
        }
        return res.send({message: "Cart was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating cart with id=${req.params.id}`)
        )
    };
};

exports.delete = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const document = await cartService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Cart not found"));
        }
        return res.send({message: "Cart was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete cart with id=${req.params.id}`)
        )
    };
};

exports.deleteAll = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const deletedCount = await cartService.deleteAll();
        return res.send({
            message: `${deletedCount} carts were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all carts")
        )
    };
};
