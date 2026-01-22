import dotenv from 'dotenv';
dotenv.config(); // ✅ no forced path needed anymore


import ConnectDB from './db/connection.js';

ConnectDB();
