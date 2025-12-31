const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  getAllQuotesAdmin,
  addQuote,
  deleteQuote,
} = require("../controllers/adminController");
const verifyAdmin = require("../middleware/authMiddleware");

router.post("/login", loginAdmin);
router.post("/logout", verifyAdmin, logoutAdmin);
router.get("/quotes", verifyAdmin, getAllQuotesAdmin);
router.post("/add", verifyAdmin, addQuote);
router.delete("/delete/:id",verifyAdmin, deleteQuote);
module.exports = router;
