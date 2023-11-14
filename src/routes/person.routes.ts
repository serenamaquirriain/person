import {Router} from 'express';                                                                                                                         
import {createPerson, getPerson, updatePerson, deletePerson, getPersons} from "../controllers/person.controllers";

const router = Router();

router.post("/persons", createPerson);

router.get("/persons", getPersons);

router.put('/persons/:id', updatePerson);

router.delete('/persons/:id', deletePerson);

router.get('/persons/:id', getPerson);

export default router