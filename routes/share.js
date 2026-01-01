const express =require("express");
const Quote= require("../models/Quote.js");

const router = express.Router();

router.get("quote/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).send("Quote not found");
    }

    const imageUrl = quote.image;
    const text = quote.text.substring(0, 100);

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${text}</title>

        <!-- Open Graph -->
        <meta property="og:title" content="${text}" />
        <meta property="og:description" content="Read & Download this quote" />
        <meta property="og:image" content="${imageUrl}" />
        <meta property="og:url" content="https://yourdomain.com/quote/${quote._id}" />
        <meta property="og:type" content="website" />

        <!-- WhatsApp -->
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <script>
          window.location.href = "https://yourdomain.com/quote/${quote._id}";
        </script>
      </head>
      <body></body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
