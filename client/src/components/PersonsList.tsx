















import React from 'react';
import {useState, useEffect} from "react"
import {Button, Table, TableCell, TableRow, TableBody} from '@mui/material'
//Card, CardContent, Typography
import { DataGrid} from '@mui/x-data-grid'
import {useNavigate} from 'react-router-dom'
import Person from './Person'

//import { useReactTable } from '@tanstack/react-table'

type SortOrder = 'ASC' | 'DESC';
type SortBy = 'name' | 'lastName';

export default function PersonList(){

    const [persons, setPersons] = useState<Person[]>([])

    //const [sortBy, setSortBy] = useState('name'); // Default sorting field
    //const [sortOrder, setSortOrder] = useState('ASC'); // Default sorting order

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

    useEffect(()=>{
        loadPersons();
    }, [])

    //?sortBy=name%sortOrder=ASC
    //http://localhost:4000/persons?sortBy=name%sortOrder=ASC


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

    const handleSort = async (sortOrder: SortOrder, sortBy: SortBy) => {
      try {
        console.log('button clicked')
        // Specify your sortBy and sortOrder values
        //const sortBy = 'name'; // Replace with your desired field
        //const sortOrder = 'ASC'; // Replace with 'ASC' or 'DESC'

        //setSortBy(sortBy);
        //setSortOrder(sortOrder);
  
        // Construct the URL with the parameters
        const url = `http://localhost:4000/persons?sortBy=${sortBy}&sortOrder=${sortOrder}`;
        //const url = `http://localhost:4000/persons?sortBy=name&sortOrder=ASC`;
  
        // Make the request to your backend
        const response = await fetch(url);
        const data = await response.json();

        const formattedPersons = data.map((person: Person) => ({
          ...person,
          formattedDate: new Date(person.birthDate).toLocaleDateString(),
        }));
        setPersons(formattedPersons); 

        //setPersons(data);
  
        // Do something with the data (update state, display, etc.)
        console.log(data);
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    }
    
    //useEffect(()=>{
      //loadPersons();
    //}, [sortBy, sortOrder])

    const personsToRows = (persons: Person[]) => {
        return persons.map((person: Person, index) => ({
          id: person.id,
          name: person.name,
          lastName: person.lastName,
          age: person.age,
          ageCategory: person.ageCategory,
          birthDate: person.formattedDate,
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
                color="secondary"
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
                  { field: 'name', headerName: 'Nombre', sortable: false, flex: 1},
                  { field: 'lastName', headerName: 'Apellido', sortable: false, flex: 1 },
                  { field: 'age', headerName: 'Edad', sortable: false, flex: 1 },
                  { field: 'ageCategory', headerName: 'Grupo etario', sortable: false, flex: 1 },
                  { field: 'birthDate', headerName: 'Fecha de nacimiento', sortable: false, flex: 1 },
                  { field: 'actions', headerName: 'Actions', sortable: false, flex: 1,}
                ]}
              />
            <Button
                variant="contained"
                color="inherit"
                onClick={()=>handleSort('ASC', 'name')}
            >
              Name ascending
            </Button>

            <Button
              variant="contained"
              color="inherit"
              onClick={()=>handleSort('DESC', 'name')}
            >
              Name descending
            </Button>

            <Button
              variant="contained"
              color="inherit"
              onClick={()=>handleSort('ASC', 'lastName')}
            >
              lastName ascending
            </Button>

            <Button
              variant="contained"
              color="inherit"
              onClick={()=>handleSort('DESC', 'lastName')}
            >
              lastName descending
            </Button>
        </>
    )
}
