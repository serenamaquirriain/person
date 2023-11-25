import {
    AfterLoad,
    AfterInsert,
    AfterUpdate,
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    BeforeInsert,
    BeforeUpdate,
    Index,
    BaseEntity,
    Between
} from 'typeorm'

import { AppDataSource } from '../db';
import cron from 'node-cron'


enum AgeCategory{
    Child = 'Niño',
    Teen = 'Adolescente',
    Adult = 'Adulto',
    Octagenarian = 'Octagenario'
}


@Entity()
export class Person extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    /*{nullable:false}*/
    @Column({nullable:false})
    name: string;

    @Column({nullable:false})
    lastName: string;

    @Column({nullable:false})
    birthDate: Date;
    
    @Column({nullable:true})
    ageCategory: AgeCategory;

    @AfterLoad()
    setAgeCategory(){
      if(!this.birthDate){
        throw new Error('birthDate is required')
      }
        const age = this.setAge(this.birthDate); 
        if (age < 11) {
            this.ageCategory = AgeCategory.Child;
          } else if (age < 18) {
            this.ageCategory = AgeCategory.Teen;
          } else if(age < 80){
            this.ageCategory = AgeCategory.Adult;
          } else{
            this.ageCategory = AgeCategory.Octagenarian;
          }
    }

    protected setAge(date: Date){
      const currentDate = new Date();
      const birthDate = this.birthDate;
      let age = currentDate.getFullYear() - birthDate.getFullYear()
      if(currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDay() <= birthDate.getDay())){
          age--
        }
      return age;
      }

}

export default Person