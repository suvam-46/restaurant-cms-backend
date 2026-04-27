export const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};
