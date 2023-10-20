import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/upload/cloudinary";
import path from "path";
import fs from "fs";
const ImgUpload = async (
  imgPath: string,
  options: cloudinary.UploadApiOptions | undefined
): Promise<UploadApiResponse> => {
  const file = path.parse(imgPath);
  const upload: UploadApiResponse = await cloudinary.v2.uploader.upload(
    imgPath,
    {
      filename_override: file.name.split("_")[0],
      ...options,
    }
  );
  if (!upload) {
    throw new Error("Image upload failed");
  } else {
    fs.unlink(imgPath, (err) => console.log(err));

    return upload;
  }
};

export const ImgDelete = async (
  publicId: string,
  options?: {
    resource_type?: cloudinary.ResourceType | undefined;
    type?: cloudinary.DeliveryType | undefined;
    invalidate?: boolean | undefined;
  }
) => {
  if (publicId) {
    return await cloudinary.v2.uploader.destroy(publicId, options);
  } else return;
};

export default ImgUpload;
