const { Router } = require('express');
const authRouter = require('./auth');
const productRouter = require('./product');

const router = Router();

router.use('/auth', authRouter);
router.use('/product', productRouter);

module.exports = router;
