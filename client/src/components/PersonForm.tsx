import React from 'react';
import {Card, CardContent, Button, TextField, Grid, Typography, CircularProgress} from '@mui/material';
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

export default function PersonForm(){

    const [person, setPerson] = useState({
        name: '',
        lastName: '',
        birthDate: null,
    });

    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');
    const [birthDateErrorMessage, setBirthDateErrorMessage] = useState('')

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if(editing){
            await fetch(`http://localhost:4000/persons/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify(person)
            });
        } else{
            await fetch('http://localhost:4000/persons/', {
                method: 'POST',
                body: JSON.stringify(person),
                headers: {"Content-Type": "application/json"}
            })
        }

        setLoading(false);

        navigate("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Validate name
        if (name === 'name'){
            if(!/^[A-Za-z]*$/.test(value)){
                setNameErrorMessage('Please enter letters only');
            } else if (value.length >= 50){
                setNameErrorMessage('Name is too long');
            }else{
                setNameErrorMessage('');
            }
           
        }   
            
        // Validate lastName
        if (name === 'lastName'){
            if(!/^[A-Za-z]*$/.test(value)) {
                setLastNameErrorMessage('Please enter letters only');
            } else if (value.length >= 50){
                setLastNameErrorMessage('Last name is too long');
            }else{
                setLastNameErrorMessage('');
            }   
        }

          if (name === 'birthDate') {
            const enteredDate = new Date(value);
            const minDate = new Date('1900-01-01'); 
            const maxDate = new Date(); //today
        
            if (isNaN(enteredDate.getFullYear()) || enteredDate < minDate || enteredDate > maxDate) {
              setBirthDateErrorMessage(`Please enter a date between ${minDate.toISOString().split('T')[0]} and ${maxDate.toISOString().split('T')[0]}`);
            } else {
              setBirthDateErrorMessage('');
            }
          }

          
        
          setPerson({
            ...person,
            [name]: value,
          });
    };

    const loadPerson = async (id: string) => {
        const res = await fetch(`http://localhost:4000/persons/${id}`);
        const data = await res.json();
        setPerson({name: data.name, lastName: data.lastName, birthDate: data.birthDate})
        setEditing(true);
    }

    useEffect(()=> {
        if(params.id){
            loadPerson(params.id);
        }
    }, [params.id])

    return(
        <Grid 
            container direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                <Card
                    sx={{mt: 5}}
                >
                    <Typography variant="subtitle1" component="div" sx={{ textAlign: 'center', mt: 2 }}>
                        {editing? "Update" : "Create new person"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Enter name'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="name"
                                value={person.name}
                                onChange={handleChange}
                                inputProps={{maxLength:50}}
                            />

                            {nameErrorMessage && <Typography color="error">{nameErrorMessage}</Typography>}

                            <TextField
                                variant='filled'
                                label='Enter last name'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="lastName"
                                value={person.lastName}
                                onChange={handleChange}
                                inputProps={{maxLength:50}}
                            />
                            {lastNameErrorMessage && <Typography color="error">{lastNameErrorMessage}</Typography>}

                            

                            <TextField
                                variant="filled"
                                label="Select a date"
                                type="date"
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="birthDate"  // Set the appropriate name for your date field
                                value={person.birthDate}  // Assuming `person.birthDate` is of type `Date | null`
                                onChange={handleChange}
                                inputProps={{
                                    style: {
                                      height: '40px', // Set the desired height
                                    },
                                  }}
                            />
                            {birthDateErrorMessage && <Typography color="error">{birthDateErrorMessage}</Typography>}

                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                disabled={!person.name || !/^[A-Za-z]*$/.test(person.name) || 
                                    !person.lastName || !/^[A-Za-z]*$/.test(person.lastName) || !person.birthDate || birthDateErrorMessage }
                            >
                                {loading? <CircularProgress
                                    color='inherit'
                                    size={24}
                                /> : 'Save'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
};