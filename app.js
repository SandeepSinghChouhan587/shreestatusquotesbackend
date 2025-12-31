var express = require('express');
const dotenv = require('dotenv');
dotenv.config()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const rateLimit =require( "express-rate-limit");

const connectDB  = require('./config/connectDB');
const quoteRoutes = require("./routes/quoteRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes.js");
const downloadRoutes =require( "./routes/downloadRoutes.js");
var app = express();

 const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per IP per window
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later.",
  },
});

//middlware
connectDB();
app.use(cors({ origin:process.env.CORS_ORIGIN.split(","), credentials: true}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/", apiLimiter);

app.use("/api/quotes", quoteRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/upload", uploadRoutes);
app.use("/api", downloadRoutes);

module.exports = app;
