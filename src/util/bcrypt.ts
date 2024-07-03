import bcrypt from "bcrypt";

export const hash = async (pass: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(pass, salt);
  return hash;
};
export const compare = async (reqPass: string, userPass: string) => {
  return await bcrypt.compare(reqPass, userPass);
};
