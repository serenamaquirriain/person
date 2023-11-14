"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("./entities/Person");
//conexion de la bd. le paso los params de la bd
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'test',
    port: 5432,
    database: 'persondb',
    entities: [Person_1.Person],
    logging: true,
    synchronize: true
});
