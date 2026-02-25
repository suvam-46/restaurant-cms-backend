import dotenv from "dotenv";
dotenv.config();

const developmentEnvironment = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET!,
};

export const EnvConfig = developmentEnvironment;
