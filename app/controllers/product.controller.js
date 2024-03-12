const ProductService = require("../services/product.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
    if (!req.body.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the product")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let document = [];

    try {
        const productService = new ProductService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            document = await productService.findByName(name);
        } else {
            document = await productService.find({});
        }
    } catch(error) {
        return next(
            new ApiError(500, "An error occurred while retrieving product")
        );
    }

    return res.send(document);
};

exports.findOne = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, `Error retrieving product with id=${req.params.id}`)
        )
    };
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was updated successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating product with id=${req.params.id}`)
        )
    };
};

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const document = await productService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({message: "Product was deleted successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete product with id=${req.params.id}`)
        )
    };
};

exports.deleteAll = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const deletedCount = await productService.deleteAll();
        return res.send({
            message: `${deletedCount} products were deleted successfully`,
        });
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all products")
        )
    };
};
