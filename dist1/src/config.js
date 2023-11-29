"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
module.exports = {
    db: {
        host: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.DB_HOST,
        user: process.env.NODE_ENV === 'production' ? '' : process.env.DB_USER,
        password: process.env.NODE_ENV === 'production' ? '' : process.env.DB_PASSWORD,
        port: process.env.NODE_ENV === 'production' ? '' : process.env.DB_PORT,
        database: process.env.NODE_ENV === 'production' ? '' : process.env.DB_DATABASE,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }
};
