const express = require('express');
const router = express.Router();

const userRoute = require('./userRoutes');
const postRoute = require('./postRoutes');

router.use('/users', userRoute);
router.use('/posts', postRoute);

// router.use('/products', productRoute);
// router.use('/orders', orderRoute);

module.exports = router;