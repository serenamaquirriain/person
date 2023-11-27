import React from 'react';
import {useState, useEffect} from "react"
import {Button, Table, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper, IconButton} from '@mui/material'
import {ArrowDropUp} from '@mui/icons-material'
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
      
    const rows = personsToRows(persons)

    return(
        <>
            <h1>Person List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                              <IconButton>
                                  <ArrowDropUp/>
                                </IconButton>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Age Category</TableCell>
                            <TableCell align="right">Birth Date</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                  {row.name}
                                </TableCell>
                                <TableCell align="right">
                                  {row.lastName}
                                </TableCell>
                                <TableCell align="right">
                                  {row.age}
                                </TableCell>
                                <TableCell align="right">
                                  {row.ageCategory}
                                </TableCell>
                                <TableCell align="right">
                                  {row.birthDate}
                                </TableCell>
                                <TableCell align="right">
                                  {row.actions}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
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
