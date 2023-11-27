import Person from './entities/Person';
import cron from 'node-cron';

import { AppDataSource } from './db';
import {Raw, Between, Entity, Column, PrimaryGeneratedColumn, Equal} from 'typeorm';

// Updates the ages of persons whose birthday is today
const dailyUpdate = async () => {
    const today = new Date();
    console.log(today);
    const todayMonth = today.getMonth() + 1; // Adds 1 because months are 0 indexed
    const todayDay = today.getDate();

    const personsToUpdate = await AppDataSource.getRepository(Person).find({
      where: {

        // Compares month and date by using raw SQL
        birthDate: Raw(
          (Person) =>
            `EXTRACT(MONTH FROM "Person"."birthDate") = ${todayMonth} AND EXTRACT(DAY FROM "Person"."birthDate") = ${todayDay}`
        ),
      },
    });
    for (const person of personsToUpdate) {
      person.age += 1; // Increments the age by 1
      await AppDataSource.getRepository(Person).save(person);
    }
    console.log(personsToUpdate);
    console.log('ejecutando!!');
    }

export default dailyUpdate;