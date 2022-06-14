import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const database = {
    connectionString: process.env.DATABASE_URL
};

if(process.env.MODE === "PROD"){
    database.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(database);
export default db;