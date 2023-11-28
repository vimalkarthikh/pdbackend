import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './db.js';
import { userRouter } from './router/userroute.js';
import { dairyRouter } from './router/dairyroute.js';
import { isAuth } from './middleware/auth.js';


dotenv.config()

const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//DB Connection
databaseConnection();

//routes
app.use('/',userRouter);
app.use('/dairy',isAuth,dairyRouter);

app.get('/',(req,res)=>{
    res.send("Hello ! User This is Success message from Dairymanagement Server")
})

app.listen(PORT,()=>{console.log("Server is running in port ");});
