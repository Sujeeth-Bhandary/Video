import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors({
    origin:process.env.CROS_ORIGIN,
    credentials:true
}));
app.use(express.json({limit:'16kb'}));
app.use(express.urlencoded({extarcted:true,limit:'16kb'}));
app.use(express.static('public'));
app.use(cookieParser());

//routes configuraton

import userRoutes from './routes/user.routes.js';

app.use("/api/v1/users",userRoutes);

export default app;