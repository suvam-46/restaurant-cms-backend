import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import messages from "@/constants/messages.constant";
import express from "express";

export const errorHandler = (
  err: any,
  _req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction
) => {
  if (err instanceof PrismaClientKnownRequestError) {
    return res.json({
      message: "Database error: ",
      err,
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || messages.serverError,
  });
};
