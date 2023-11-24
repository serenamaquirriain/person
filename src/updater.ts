import cron from 'node-cron';
import {Person} from './entities/Person';
import { AppDataSource } from './db';

const dailyUpdate = () => {
    console.log('ejecutando!!');
}
//corre a las 00:00 todos los dias
cron.schedule('0 0 * * *', dailyUpdate);

export default dailyUpdate;

