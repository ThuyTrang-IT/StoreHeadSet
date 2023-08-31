const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const larkApiUrl = 'https://open.larksuite.com/open-apis/bitable/v1/apps/EXZJb5RMFaCMSssEgsClo1fkgme/tables/tblwZqz97u8EegBi/records';
    const accessToken = process.env.accessToken;

    // Lấy dữ liệu từ request gửi từ phía frontend
    const paymentData = req.body;

    // Thêm access token và Content-Type vào headers của request
    const response = await axios.post(larkApiUrl, paymentData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
