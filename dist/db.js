"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
//import {Person} from './entities/User.Person'
//conexion de la bd. le paso los params de la bd
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'test',
    port: 5432,
    database: 'persondb',
    entities: [],
    //entities: [Person],
    logging: true,
    //synchronize: true
});
