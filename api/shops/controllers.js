const Shop = require("../../models/Shop");
const Product = require("../../models/Product");

exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    req.body.owner = req.user._id;
    const newShop = await Shop.create(req.body);
    return res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    const shopId = req.params.shopId;
    req.body = { ...req.body, shop: shopId };
    const newProduct = await Product.create(req.body);
    await Shop.findOneAndUpdate(
      { _id: req.params.shopId },
      { $push: { products: newProduct._id } }
    );
    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
