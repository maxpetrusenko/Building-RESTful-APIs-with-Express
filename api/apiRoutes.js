const express = require('express');
const postsRoutes = require('../posts/postsRoutes');
// const productRoutes = require('./products/productRoutes');
// const clientRoutes = require('./clients/clientRoutes');

const router = express.Router(); // notice the Uppercase R

router.use('/posts', postsRoutes);
// server.use('/products', productRoutes);
// server.use('/clients', clientRoutes);

module.exports = router