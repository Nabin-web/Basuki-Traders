const productSchema = require("./productSchema");

const productController = {};

productController.saveProduct = async (req, res, next) => {
  try {
    const product = req.body;
    if (product._id) {
      const oldProduct = await productSchema.findOne({
        _id: product._id,
        is_active: true,
        is_deleted: false,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = productController;
