import bcrypt from "bcrypt";
import config from "../config";
const hashPassword = async (password: string) => {
  const hash = await bcrypt.hashSync(password, config.saltRounds);
  return hash;
};
const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compareSync(password, hashedPassword);
  return isMatch;
};
const B = { hashPassword, comparePassword };
export default B;
