import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { EnvConfig } from "@config/env.config";
import messages from "@/constants/messages.constant";

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const token = req.cookies?.auth_token || req.cookies?.author_auth_token;

  if (!token) {
    return res.status(401).json({ message: messages.unAuthorized });
  }

  try {
    const decoded = jwt.verify(token, EnvConfig.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: messages.invalidToken, error: err });
  }
};
