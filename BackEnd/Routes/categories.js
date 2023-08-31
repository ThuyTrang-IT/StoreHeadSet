const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

// Định nghĩa route GET /api/categories
router.get('/', async (req, res) => {
  try {
    const url = 'https://open.larksuite.com/open-apis/bitable/v1/apps/EXZJb5RMFaCMSssEgsClo1fkgme/tables/tblRqLdlgu32fFAx/records?page_size=20&view_id=vewcAvFVKq';
    const accessToken = process.env.accessToken;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
