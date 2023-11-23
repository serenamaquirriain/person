import {DataSource} from 'typeorm'
import {Person} from './entities/Person'
const {db} = require('./config')

//conexion de la bd. le paso los params de la bd
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: db.host,
    username: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    entities: [Person],
    logging: true, // Example: Enable logging in development
    synchronize: true, // Example: Synchronize database in development

    /*
    type: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'test',
    port: 5432,
    database: 'persondb',
    entities: [Person],
    logging: true,
    synchronize: true
    */
})

/*
const pool = new Pool({
    user: db.user,
    password: db.password,  
    host: db.host,
    port: db.port,
    database: db.database
})
*/