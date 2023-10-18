const PORT = 4000;
const saltRounds = 15;
const accessToken = { secret: "7DkP9fjLmNqG2wT8", validate: "3d" };
const refreshToken = { secret: "X5aJkPqRtWv7bL8E", validate: "365d" };
const multerUploadPath = process.cwd() + "/temp/uploads";
const imageBbAPI = "fef0fd64864d05bc422959152dd95e26";
const subscriber = { totalShippingAddress: 3 };
const config = {
  PORT,
  saltRounds,
  accessToken,
  refreshToken,
  multerUploadPath,
  imageBbAPI,
  subscriber,
};
export default config;
