import {
    AfterLoad,
    Column, 
    Entity, 
    PrimaryGeneratedColumn,
    BaseEntity,
    Index
} from 'typeorm';

enum AgeCategory{
    Child = 'Niño',
    Teen = 'Adolescente',
    Adult = 'Adulto',
    Octagenarian = 'Octagenario'
}

@Entity()
@Index('idx_birthDate', ['birthDate']) // To optimize fetching today's birthdays (see updater)
export class Person extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    name: string;

    @Column({nullable:false})
    lastName: string;
    
    @Column({nullable:false})
    birthDate: Date;

    @Column({nullable:true})
    age: number
    
    @Column({nullable:true})
    ageCategory: AgeCategory;

    // Calculates age from birthDate
    @AfterLoad()
    setAge(){
      const today = new Date();
      const birthDate = this.birthDate;
      this.age = today.getFullYear() - birthDate.getFullYear()
      if(birthDate.getMonth() > today.getMonth() || 
        (birthDate.getMonth() === today.getMonth() && birthDate.getDay() > today.getDay())){
          this.age--
        }
    }
    // Calculates Age Category from age
    @AfterLoad()
    setAgeCategory(){
      if(!this.birthDate || !this.age){
        throw new Error('birthDate and date are required')
      }
        const age = this.age 
        if (this.age < 11) {
            this.ageCategory = AgeCategory.Child;
          } else if (this.age < 18) {
            this.ageCategory = AgeCategory.Teen;
          } else if(this.age < 80){
            this.ageCategory = AgeCategory.Adult;
          } else{
            this.ageCategory = AgeCategory.Octagenarian;
          }
    }
}

export default Person;