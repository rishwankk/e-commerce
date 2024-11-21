import express from 'express';
import connectDb from './config/db.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use(cors());
const port=process.env.PORT ||3000
await connectDb ()
app.use("/api",userRouter)
app.listen(port,()=>{
    console.log("listening",port);
    
})