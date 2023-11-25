import Person from './entities/Person';
import cron from 'node-cron';

import { AppDataSource } from './db';
import {Raw, Between, Entity, Column, PrimaryGeneratedColumn, Equal} from 'typeorm';

const dailyUpdate = async () => {
    const today = new Date();
    console.log(today);
    const todayMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
    const todayDay = today.getDate();


    // Find persons whose birthDate is between start and end of today
    const personsToUpdate = await AppDataSource.getRepository(Person).find({
      where: {

        // Use the RAW SQL to compare only the month and day components
        birthDate: Raw(
          (Person) =>
            
            `EXTRACT(MONTH FROM "Person"."birthDate") = ${todayMonth} AND EXTRACT(DAY FROM "Person"."birthDate") = ${todayDay}`
        ),
      },
       // birthDate: Equal(today),
      //},
    });
    console.log(personsToUpdate);
    console.log('ejecutando!!');
    }
//corre a las 00:00 todos los dias
cron.schedule('27 6 * * *', dailyUpdate);

export default dailyUpdate;