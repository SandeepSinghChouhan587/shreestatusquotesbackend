const { PutObjectCommand } = require( "@aws-sdk/client-s3");
const { getSignedUrl } = require( "@aws-sdk/s3-request-presigner");
const s3 = require( "../config/s3.js");
const crypto = require("crypto");

const getUploadUrl = async (req, res) => {
  try {
    const { fileType } = req.body;

    if (!fileType) {
      return res.status(400).json({ message: "File type required" });
    }

    const fileKey = `uploads/${crypto.randomUUID()}.${fileType}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      ContentType: `image/${fileType}`,
    });

    const uploadURL = await getSignedUrl(s3, command, {
      expiresIn: 60, // 1 minute
    });

    res.status(200).json({
      uploadURL,
      fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload URL generation failed" });
  }
};

module.exports = getUploadUrl