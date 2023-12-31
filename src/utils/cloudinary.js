import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload on  cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("file is uploaded ", response.url);
    // console.log(response)
    fs.unlinkSync(localFilePath, (err) => {
      if (err) throw err;
    });
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath, (err) => {
      if (err) throw err;
    }); // remove the locally saved temp file as the upload operation failed
    return null;
  }
};

export { uploadOnCloudinary };
