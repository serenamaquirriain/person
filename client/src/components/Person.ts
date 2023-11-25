/* enum AgeCategory{
    Child = 'Nino',
    Teen = 'Adolescente',
    Adult = 'Adulto',
    Octagenarian = 'Octagenarian'
}
*/

interface Person {
    id: number;
    name: string;
    lastName: string;
    birthDate: Date;
    formattedDate: string;
    ageCategory: string;
}

export default Person;