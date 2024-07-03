import JWT from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";

const { Secret, JWT_ACCESS_EXP } = EnvVars.Jwt;

type data = {
  id: number;
  email: string;
};

export const accessTokenGenerator = (data: data) => {
  const token = JWT.sign(
    {
      ...data,
    },
    Secret,
    { expiresIn: JWT_ACCESS_EXP },
  );

  return token;
};
export const refreshTokenGenerator = (data: data) => {
  const token = JWT.sign(
    {
      ...data,
    },
    Secret,
  );

  return token;
};
