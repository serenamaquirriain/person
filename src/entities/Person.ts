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
    BaseEntity
} from 'typeorm'

/*
enum AgeCategory{
    Child = 'Niño',
    Teen = 'Adolescente',
    Adult = 'Adulto',
    Octagenarian = 'Octagenario'
}
*/


@Entity()
export class Person extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    /*{nullable:false}*/
    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;
    
    @Column({nullable:true})
    ageCategory: String;
    
    @AfterLoad()
    setAgeCategory(){
      if(!this.birthDate){
        throw new Error('birthDate is required')
      }
        const currentDate = new Date();
        const birthDate = this.birthDate
        const age = currentDate.getFullYear() - birthDate.getFullYear()
        if (age < 11) {
            this.ageCategory = "Child";
          } else if (age < 18) {
            this.ageCategory = "Teen";
          } else if(age < 80){
            this.ageCategory = "Adult";
          } else{
            this.ageCategory = "Octagenarian";
          }
    }
    

}