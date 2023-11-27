import {DataSource} from 'typeorm'
import {Person} from './entities/Person'
const {db} = require('./config')

// Conncetion to database. See config
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: db.host,
    username: db.user,
    password: db.password,
    port: db.port,
    database: db.database,
    entities: [Person],
    logging: true, // Enable logging in development
    synchronize: true, // Synchronize database in development

})