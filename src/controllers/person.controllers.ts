import {Request, Response} from "express";
import {Person} from '../entities/Person';
import { request } from "http";

export const createPerson = async (req: Request, res: Response) => {
    try{
        const {name, lastName, birthDate} = req.body;
        const person = new Person();
        person.name = name;
        person.lastName = lastName;
        person.birthDate = birthDate;

        await person.save();

        return res.json(person);
    } catch (error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const getPersons = async (req: Request, res: Response) =>{
    try{
        const persons = await Person.find()
        return res.json(persons);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}

export const updatePerson = async(req: Request, res: Response) =>{
    try{
        //const{firstName, lastName} = req.body;
        const {id} = req.params;

        const person = await Person.findOneBy({id: parseInt(req.params.id)})
        if(!person) return res.status(404).json({message: 'Person not found'});

        await Person.update({id: parseInt(id)}, req.body); //para que solo actualice lo que le paso

        return res.sendStatus(204);
    } catch (error) {
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
    
}

export const deletePerson = async(req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const result = await Person.delete({id: parseInt(id)});
    
        if(result.affected===0){
            return res.status(404).json({message: "Person not found"});
        }
        return res.sendStatus(204);
    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
};

export const getPerson = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        const person = await Person.findOneBy({id: parseInt(id)});
        return res.json(person);
    } catch(error){
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
    }
}