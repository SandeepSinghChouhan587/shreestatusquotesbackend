const BlacklistedToken = require("../models/BlacklistedToken");
const Admin = require("../models/Admin");
const Quote = require("../models/Quote");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.json({success:false, message: "Invalid credentials" });
  
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.json({success:false, message: "Incorrect Password" });
  
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  
    res.status(200).json({ token ,success:true, message:"admin loggedIn successfully" });

  } catch (error) {
  res.status(500).json({success:false,message:"server error",error:error});
  }
};



exports.logoutAdmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(400).json({ message: "Token missing" });

    await BlacklistedToken.create({ token });

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};


 exports.getAllQuotesAdmin = async (req, res) => {
  try {
    const quotes = await Quote.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({success:true, quotes});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
};

// ADD new quote (Admin)
exports.addQuote = async (req, res) => {
  try {
    let { text, category, image } = req.body;

    if (!text || !category || !image) {
      return res.status(400).json({
        message: "Text, category and image are required",
      });
    }

    // Ensure category is always an array
    if (!Array.isArray(category)) {
      category = [category];
    }

    const quote = new Quote({
      text,
      category,
      image,
    });

    await quote.save();

    res.status(201).json({
      message: "Quote added successfully",
      quote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add quote" });
  }
};

// DELETE QUOTE
exports.deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    await Quote.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    console.error("Delete Quote Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting quote",
    });
  }
};
