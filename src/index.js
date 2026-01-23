import dotenv from 'dotenv';
dotenv.config(); 
import app from './app.js';


import ConnectDB from './db/connection.js';

ConnectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running on port ${process.env.PORT||8000}`);
    });
}).catch((err)=>{
    console.error("Failed to connect to the database:", err);
})
