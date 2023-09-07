require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Sử dụng các middleware
app.use(cors());
app.use(bodyParser.json());


// Đăng ký các tệp routes
const customerRoutes = require('./Routes/customer');
const categoriesRoutes = require('./Routes/categories');
const productsRoutes = require('./Routes/products');
const paymentRoutes = require('./Routes/payment');
const productDetailRoutes = require('./Routes/productDetail');
app.use('/api/categories', categoriesRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/productDetail', productDetailRoutes);

// Khởi động server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
