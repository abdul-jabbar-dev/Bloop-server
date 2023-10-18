const PORT = 4000;
const saltRounds = 15;
const accessToken = { secret: "7DkP9fjLmNqG2wT8", validate: "3d" };
const refreshToken = { secret: "X5aJkPqRtWv7bL8E", validate: "365d" };
const multerUploadPath = process.cwd() + "/temp/uploads"; 
const subscriber = { totalShippingAddress: 3 };
const cloudinary = {
  api_key: "326797376699676",
  api_secret: "U2OcTLd7F1q90fBh93r4WgbgjEQ",
  cloud_name: "dnkwv76h3",
};
const config = {
  PORT,
  saltRounds,
  accessToken,
  refreshToken,
  multerUploadPath, 
  subscriber,
  cloudinary,
};
export default config;
