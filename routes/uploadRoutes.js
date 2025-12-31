const express = require("express");
const  getUploadUrl  =require( "../controllers/uploadController.js");

const router = express.Router();

router.post("/upload-url", getUploadUrl);

module.exports = router;