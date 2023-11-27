import React from 'react';
import {useState, useEffect} from "react"
import {Button, Table, TablePagination, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper, IconButton} from '@mui/material'
import {Delete, Edit, ArrowUpward} from '@mui/icons-material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//Card, CardContent, Typography
//import { DataGrid} from '@mui/x-data-grid'
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
        
        // Construct the URL with the parameters
        const url = `http://localhost:4000/persons?sortBy=${sortBy}&sortOrder=${sortOrder}`;
        //const url = `http://localhost:4000/persons?sortBy=name&sortOrder=ASC`;
  
        // Make the request to the backend
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
              <IconButton onClick={()=>navigate(`/persons/${person.id}/edit`)}>
                <Edit style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }} />
              </IconButton>
              <IconButton onClick={()=>handleDelete(person.id.toString())}>
                <Delete style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }} />
              </IconButton>
              
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
                          <TableCell align="right">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ textAlign: 'center', flex: 1 }}>
                                Nombre
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton onClick={()=>handleSort('ASC', 'name')}>
                                  <ArrowUpward style={{ minWidth: '10px', minHeight: '10px', maxWidth: '12px', maxHeight: '12px'}} />
                                </IconButton>
                                <IconButton onClick={()=>handleSort('DESC', 'name')}>
                                  <ArrowDownwardIcon style={{ minWidth: '10px', minHeight: '10px', maxWidth: '12px', maxHeight: '12px' }} />
                                </IconButton>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div style={{ textAlign: 'center', flex: 1 }}>
                                Apellido
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <IconButton onClick={()=>handleSort('ASC', 'lastName')}>
                                  <ArrowUpward style={{ minWidth: '10px', minHeight: '10px', maxWidth: '12px', maxHeight: '12px' }} />
                                </IconButton>
                                <IconButton onClick={()=>handleSort('DESC', 'lastName')}>
                                  <ArrowDownwardIcon style={{ minWidth: '10px', minHeight: '10px', maxWidth: '12px', maxHeight: '12px' }} />
                                </IconButton>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell align="center">Age</TableCell>
                          <TableCell align="center">Age Category</TableCell>
                          <TableCell align="center">Birth Date</TableCell>
                          <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">
                                  {row.name}
                                </TableCell>
                                <TableCell align="center">
                                  {row.lastName}
                                </TableCell>
                                <TableCell align="center">
                                  {row.age}
                                </TableCell>
                                <TableCell align="center">
                                  {row.ageCategory}
                                </TableCell>
                                <TableCell align="center">
                                  {row.birthDate}
                                </TableCell>
                                <TableCell align="center">
                                  {row.actions}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
