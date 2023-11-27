"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("./entities/Person");
const { db } = require('./config');
// Conncetion to database. See config
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: db.host,
    username: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    entities: [Person_1.Person],
    logging: true,
    synchronize: true, // Synchronize database in development
});
