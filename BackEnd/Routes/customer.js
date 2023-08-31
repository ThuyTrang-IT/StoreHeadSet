// routes/larksuiteRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

const accessToken = process.env.accessToken; // Thay thế bằng access token của bạn
const postUrl = "https://open.larksuite.com/open-apis/bitable/v1/apps/EXZJb5RMFaCMSssEgsClo1fkgme/tables/tblyjmciDGPTncvT/records";
const getUrl = "https://open.larksuite.com/open-apis/bitable/v1/apps/EXZJb5RMFaCMSssEgsClo1fkgme/tables/tblyjmciDGPTncvT/records?page_size=20&view_id=vew632Bdtd";

router.post("/", async (req, res) => {
  try {
    const response = await axios.post(postUrl, {
      fields: {
        Name: req.body.Name,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Address: req.body.Address,
      },
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error submitting data to Lark Suite:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(getUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Lark Suite:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
