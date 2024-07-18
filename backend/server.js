import express from "express";
import './db/conn.js'
 import jobRouter from "./router/jobroute.js";
import userRouter from "./router/userroute.js";
 import applicationRouter from "./router/applicationroute.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
 import fileUpload from "express-fileupload";
 import cloudinary from "cloudinary";


const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin:'http://localhost:5173',
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.get('/',(req,res) =>{
  res.json({
    success:true,
    message:"get the job"
  })
})
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
 app.use("/api/v1/job", jobRouter);
 app.use("/api/v1/application", applicationRouter);
// dbConnection();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
  });
export default app;