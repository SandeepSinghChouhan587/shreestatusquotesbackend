const sharp =require("sharp");
const axios =require("axios");

 const downloadWithWatermark = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image URL required" });
    }

    // Fetch image
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    // Add watermark
    const watermarkedImage = await sharp(imageResponse.data)
      .composite([
        {
          input: Buffer.from(`
            <svg width="500" height="100">
              <text x="10" y="60"
                font-size="36"
                fill="white"
                opacity="0.7"
                font-family="Arial">
                 shreestatusquotes.vercel.app
              </text>
            </svg>
          `),
          gravity: "southeast",
        },
      ])
      .jpeg()
      .toBuffer();

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=quote.jpg"
    );
    res.setHeader("Content-Type", "image/jpeg");

    res.send(watermarkedImage);
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Failed to download image" });
  }
};
module.exports = downloadWithWatermark ;
