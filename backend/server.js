import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cartRoutes from './routes/cartRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import paymentRoutes from "./routes/paymentRoutes.js";
import visitRoutes from "./routes/visitRoutes.js";

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json())

app.use("/api/cart",cartRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/payment", paymentRoutes);
app.use('/api/visits', visitRoutes); 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000,() => console.log("Server running on port 5000"));

  })
  .catch (err => console.log(err));