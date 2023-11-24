"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = exports.deletePerson = exports.updatePerson = exports.getPersons = exports.createPerson = void 0;
const Person_1 = require("../entities/Person");
const createPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastName, birthDate } = req.body;
        const person = new Person_1.Person();
        person.name = name;
        person.lastName = lastName;
        person.birthDate = birthDate;
        yield person.save();
        return res.json(person);
    }
    catch (error) {
        next(error);
        /*
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        */
    }
});
exports.createPerson = createPerson;
const getPersons = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield Person_1.Person.find();
        return res.json(persons);
    }
    catch (error) {
        next(error);
        /*
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        */
    }
});
exports.getPersons = getPersons;
const updatePerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //const{firstName, lastName} = req.body;
        const { id } = req.params;
        const person = yield Person_1.Person.findOneBy({ id: parseInt(req.params.id) });
        if (!person)
            return res.status(404).json({ message: 'Person not found' });
        yield Person_1.Person.update({ id: parseInt(id) }, req.body); //para que solo actualice lo que le paso
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
        /*
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        */
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Person_1.Person.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: "Person not found" });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        next(error);
        /*
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        */
    }
});
exports.deletePerson = deletePerson;
const getPerson = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const person = yield Person_1.Person.findOneBy({ id: parseInt(id) });
        return res.json(person);
    }
    catch (error) {
        next(error);
        /*
        if(error instanceof Error){
            return res.status(500).json({message: error.message});
        }
        */
    }
});
exports.getPerson = getPerson;
