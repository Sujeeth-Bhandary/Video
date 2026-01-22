import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ConnectDB from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ FORCE correct .env file
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});




ConnectDB();
