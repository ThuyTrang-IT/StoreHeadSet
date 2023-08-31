const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
  try {
    const url = 'https://open.larksuite.com/open-apis/bitable/v1/apps/EXZJb5RMFaCMSssEgsClo1fkgme/tables/tbllJJ3eg3VJisHR/records?page_size=20&view_id=vewCSCTiwP';
    const accessToken = process.env.accessToken;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching productDetail data:', error);
    res.status(500).json({ message: 'Error fetching productDetail data' });
  }
});

module.exports = router;
