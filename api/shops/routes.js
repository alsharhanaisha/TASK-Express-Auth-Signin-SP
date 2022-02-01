const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer');

const { shopCreate, getShops, productCreate } = require('./controllers');

router.get('/', getShops);
router.post('/', shopCreate);
router.post('/:shopId/products', upload.single('image'), productCreate);

module.exports = router;
