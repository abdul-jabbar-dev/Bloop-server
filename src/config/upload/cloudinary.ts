import cloudinary from "cloudinary"; 
import config from "..";
cloudinary.v2.config({
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  cloud_name: config.cloudinary.cloud_name,
});
export default cloudinary