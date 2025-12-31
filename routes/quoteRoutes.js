const express = require("express");
const {
  getAllQuotes,
  getQuotesByCategory,
  likeQuote,
  downloadQuote,
  shareQuote,
 getQuotesPaginated

}  = require("../controllers/quoteController.js");
const verifyAdmin = require("../middleware/authMiddleware.js");

const router = express.Router();

// Public Routes
router.get("/", getAllQuotes);
router.get("/category/:category", getQuotesByCategory);
 router.get("/paginated", getQuotesPaginated);
// Actions
router.put("/like/:id", likeQuote);
router.put("/download/:id", downloadQuote);
router.put("/share/:id", shareQuote);


module.exports =  router;