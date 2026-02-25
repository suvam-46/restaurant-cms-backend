import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import { EnvConfig } from "@config/env.config";
import { limiter } from "@/utils/rateLimit.util";
import { v1Router } from "@/routes/v1/index.route";
import { corsOptions } from "@/configs/cors.config";

const app = express();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter);

app.use("/api/v1", v1Router);

app.use(errorHandler);

app.listen(EnvConfig.PORT, () => {
  console.log(`Server is running on port ${EnvConfig.PORT}`);
});
