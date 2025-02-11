import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.route.js";
import employeeRouter from "./routes/employee.router.js";

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running");
});

//Routers
app.use("/api/Auth", authRoutes);
app.use("/api/employee", employeeRouter);

//Middleware to handle error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
