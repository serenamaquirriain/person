import {
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    BeforeInsert,
    BeforeUpdate,
    Index,
    BaseEntity
} from 'typeorm'


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

    //{nullable:false}
    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;
    
    /*
    @Column()
    ageCategory: AgeCategory;
    */

    /*
    @BeforeInsert()
    @BeforeUpdate()
    setAgeCategory(){
        const currentDate = new Date();
        const age = currentDate.getFullYear() - this.birthDate.getFullYear();
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
    */

}