import Person from './entities/Person';
import cron from 'node-cron';

import { AppDataSource } from './db';
import {Raw, Between, Entity, Column, PrimaryGeneratedColumn, Equal} from 'typeorm';

const dailyUpdate = async () => {
    const today = new Date();
    console.log(today);
    const todayMonth = today.getMonth() + 1; // Months are 0-indexed, so add 1
    const todayDay = today.getDate();

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
    for (const person of personsToUpdate) {
      person.age += 1; // Increment the age by 1
      await AppDataSource.getRepository(Person).save(person);
    }
    console.log(personsToUpdate);
    console.log('ejecutando!!');
    }

export default dailyUpdate;