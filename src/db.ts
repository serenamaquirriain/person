import {DataSource} from 'typeorm'
//import {Person} from './entities/User.Person'

//conexion de la bd. le paso los params de la bd
export const AppDataSource = new DataSource({
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
})