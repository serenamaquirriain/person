import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    db: {
        host: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DB_HOST,
        user: process.env.NODE_ENV === 'production' ? '' : process.env.DB_USER,
        password: process.env.NODE_ENV === 'production' ? '' : process.env.DB_PASSWORD,
        port: process.env.NODE_ENV === 'production' ? '' : process.env.DB_PORT,
        database: process.env.NODE_ENV === 'production' ? '' : process.env.DB_DATABASE,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,  
    }
}