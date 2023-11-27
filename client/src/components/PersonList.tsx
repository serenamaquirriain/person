import React from 'react';
import {useState, useEffect} from "react"
import {Table, TableCell, TableRow, TableBody, TableContainer, TableHead, Paper, IconButton} from '@mui/material'
import {Delete, Edit, ArrowUpward} from '@mui/icons-material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {useNavigate} from 'react-router-dom'
import Person from './Person'

type SortOrder = 'ASC' | 'DESC';
type SortBy = 'name' | 'lastName';

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
    }

    useEffect(()=>{
        loadPersons();
    }, [])

    const handleDelete = async (id: String) => {
        try{
            //deletes from back
            await fetch(`http://localhost:4000/persons/${id}`, {
                method: "DELETE",
            })

            //deletes from front  
            setPersons(persons.filter(person => (person.id).toString() !== id))
        } catch(error){
            console.log(error);
        }
    }

    const handleSort = async (sortOrder: SortOrder, sortBy: SortBy) => {
      try {
        console.log('button clicked')
        
        //Builds the URL with the parameters
        const url = `http://localhost:4000/persons?sortBy=${sortBy}&sortOrder=${sortOrder}`;

        //Makes the request to the backend
        const response = await fetch(url);
        const data = await response.json();

        const formattedPersons = data.map((person: Person) => ({
          ...person,
          formattedDate: new Date(person.birthDate).toLocaleDateString(),
        }));
        setPersons(formattedPersons); 
      } catch (error) {
        console.error('Error fetching persons:', error);
      }
    }

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
                <Edit style={{ minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }} />
              </IconButton>
              <IconButton onClick={()=>handleDelete(person.id.toString())}>
                <Delete style={{ minWidth: '20px', minHeight: '20px', maxWidth: '20px', maxHeight: '20px' }} />
              </IconButton>
              
            </div>
          ),
        }));
      };
      
    const rows = personsToRows(persons)

    //returns table with all entries
    return(
        <>
            <h1>Person List</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
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
