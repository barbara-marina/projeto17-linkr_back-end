import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL

};

    
if(process.env.MODE === 'DEV'){
    databaseConfig.ssl = {
        rejectUnauthorized : false
    }
}

const db = new Pool(databaseConfig);

export default db;