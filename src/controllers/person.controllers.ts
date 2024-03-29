import {NextFunction, Request, Response} from "express";
import {Person} from '../entities/Person';
import { AppDataSource } from '../db';

export const createPerson = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, lastName, birthDate} = req.body;
        const person = new Person();
        person.name = name;
        person.lastName = lastName;
        person.birthDate = birthDate;

        await person.save();

        return res.json(person);
    } catch (error){
        next(error)
    }
}


export const getPersons = async (req: Request, res: Response, next: NextFunction) => {
    const sortOrderValidValues = ["ASC", "DESC"];

    try {
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder as string | undefined;

    const queryBuilder = AppDataSource.getRepository(Person).createQueryBuilder('person');

    if (sortBy && sortOrder && sortOrderValidValues.includes(sortOrder)) {
        queryBuilder.orderBy(`person.${sortBy}`, sortOrder as "ASC" | "DESC");
    }

    const persons = await queryBuilder.getMany();

    return res.json(persons);
    } catch (error) {
        next(error);
    }
  };


export const updatePerson = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const {id} = req.params;

        const person = await Person.findOneBy({id: parseInt(req.params.id)})
        if(!person) return res.status(404).json({message: 'Person not found'});

        await Person.update({id: parseInt(id)}, req.body); // only the new parameters are updated
        return res.sendStatus(204);
    } catch (error) {
        next(error)
    }
    
}

export const deletePerson = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        const {id} = req.params;
        const result = await Person.delete({id: parseInt(id)});
    
        if(result.affected===0){
            return res.status(404).json({message: "Person not found"});
        }
        return res.sendStatus(204);
    } catch(error){
        next(error)
    }
};

export const getPerson = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const person = await Person.findOneBy({id: parseInt(id)});
        return res.json(person);
    } catch(error){
        next(error)
    }
}