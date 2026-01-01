const Quote = require( "../models/Quote.js");

// GET all quotes
 const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
};

// GET quotes by category
const getQuotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    // Normalize search input
    const normalizedSearch = category
      .toLowerCase()
      .replace(/[\s_-]/g, "");

    const quotes = await Quote.find({
      category: {
        $elemMatch: {
          $regex: normalizedSearch
            .split("")
            .join(".*"), // allows partial fuzzy matching
          $options: "i",
        },
      },
    }).lean();

    if (!quotes.length) {
      return res.status(404).json({
        message: "No quotes found for this category",
      });
    }

    res.status(200).json(quotes);
  } catch (error) {
    console.error("Category fetch error:", error);
    res.status(500).json({
      message: "Failed to fetch quotes by category",
    });
  }
};



// LIKE quote
 const likeQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Like failed" });
  }
};

// DOWNLOAD count
 const downloadQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Download failed" });
  }
};


const shareQuote = async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(
      req.params.id,
      { $inc: { shares: 1 } },
      { new: true }
    );

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Share failed" });
  }
};

const getQuotesPaginated = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const quotes = await Quote.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res.json(quotes);
};

const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json(quote);
  } catch (error) {
    console.error("Get Quote Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllQuotes,
  getQuotesByCategory,
  likeQuote,
  downloadQuote,
  shareQuote,
  getQuotesPaginated,
  getQuoteById
}