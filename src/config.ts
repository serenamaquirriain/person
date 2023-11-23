import dotenv from 'dotenv';

// Call the config method on the imported object
dotenv.config();

//const config = require('dotenv')
//config()

module.exports = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE   
    }
}