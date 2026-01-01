const express = require("express");
const {
  getAllQuotes,
  getQuotesByCategory,
  likeQuote,
  downloadQuote,
  shareQuote,
 getQuotesPaginated,
 getQuoteById 

}  = require("../controllers/quoteController.js");


const router = express.Router();

// Public Routes
router.get("/", getAllQuotes);
router.get("/category/:category", getQuotesByCategory);
router.get("/paginated", getQuotesPaginated);
router.get("/:id", getQuoteById);
// Actions
router.put("/like/:id", likeQuote);
router.put("/download/:id", downloadQuote);
router.put("/share/:id", shareQuote);


module.exports =  router;