const express = require("express");
const generatePdfHandler = require("../handler/generatePdfHandler");
const ROUTER = express.Router();

ROUTER.post("/generate_pdf", generatePdfHandler);

module.exports = ROUTER;
