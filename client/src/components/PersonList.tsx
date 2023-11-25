import {useState, useEffect} from "react"
import {Button} from '@mui/material'
//Card, CardContent, Typography
import { DataGrid } from '@mui/x-data-grid'
import {useNavigate} from 'react-router-dom'
import Person from './Person'

export default function PersonList(){

    const [persons, setPersons] = useState<Person[]>([])

    const navigate = useNavigate();

    const loadPersons = async () => {
        const response = await fetch('http://localhost:4000/persons')
        const data = await response.json()
        const formattedPersons = data.map((person: Person) => ({
          ...person,
          formattedDate: new Date(person.birthDate).toLocaleDateString(),
        }));
        setPersons(formattedPersons); 
        //console.log(data)
        //setPersons(data)
    }

    const handleDelete = async (id: String) => {
        try{
            //borro del back
            await fetch(`http://localhost:4000/persons/${id}`, {
                method: "DELETE",
            })

            //borro del front  
            setPersons(persons.filter(person => (person.id).toString() !== id))
        } catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        loadPersons();
    }, [])

    const personsToRows = (persons: Person[]) => {
        return persons.map((person: Person, index) => ({
          id: person.id,
          name: person.name,
          lastName: person.lastName,
          birthDate: person.formattedDate,
          ageCategory: person.ageCategory,
          actions: (
            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/users/${person.id}/edit`)}
              >
                Edit
              </Button>
      
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(person.id.toString())}
              >
                Delete
              </Button>
            </div>
          ),
        }));
      };      

    return(
        <>
            <h1>Person List</h1>
            <DataGrid
                autoHeight
                rows={personsToRows(persons)}
                columns={[
                    { field: 'name', headerName: 'Name', flex: 1 },
                    { field: 'lastName', headerName: 'Last Name', flex: 1 },
                    { field: 'birthDate', headerName: 'Birth Date', flex: 1 },
                    { field: 'ageCategory', headerName: 'Age Category', flex: 1 }
                ]}
            />
        </>
    )
}