import multer from "multer";
import path from "path";
import { mkdir } from "fs";
import config from "../../../config"; 
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await mkdir(config.multerUploadPath, { recursive: true }, () => {
      cb(null, config.multerUploadPath);
    });
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const myUpload = path.parse(file.originalname);
    cb(null, myUpload.name + "_" + uniqueSuffix + "_" + myUpload.ext);
  },
});

const upload = multer({ storage: storage });
export default upload;
