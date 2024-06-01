import express from "express";
import color from "colors";
import dotenv from "dotenv";
const app = express();
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
dotenv.config();
connectDb();
app.use(express.json());
app.use(morgan("dev"));
// app.use(express.static(path.join(__dirname,'./client/build')))
//routes or api
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/products", productRoutes);
//mmiddleware for cors error
app.use(cors());
//sample api route
// app.use('*',function(req,res){
//    res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server running on port ${port}`.bgCyan.white);
});
