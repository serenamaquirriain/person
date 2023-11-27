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
    //const [showErrorMessage, setShowErrorMessage] = useState(false);

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
            await fetch('http://localhost:4000/persons', {
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

            // Validate only letters for name
        if (name === 'name' && !/^[A-Za-z]*$/.test(value)) {
            setNameErrorMessage('Please enter only letters for the name.');
        } else {
            setNameErrorMessage('');
        }
    
        // Validate only letters for lastName
        if (name === 'lastName' && !/^[A-Za-z]*$/.test(value)) {
            setLastNameErrorMessage('Please enter only letters for the last name.');
        } else {
            setLastNameErrorMessage('');
            setPerson({
            ...person,
            [name]: value,
            });
        }
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
                    <Typography>
                        {editing? "Create Person" : "Update"}
                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Enter your name'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="name"
                                value={person.name}
                                onChange={handleChange}
                            />

                            {nameErrorMessage && <Typography color="error">{nameErrorMessage}</Typography>}

                            <TextField
                                variant='filled'
                                label='Enter your last name'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0'
                                }}
                                name="lastName"
                                value={person.lastName}
                                onChange={handleChange}
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
                            />

                            <Button
                                variant='contained'
                                color='primary'
                                type='submit'
                                disabled={!person.name || !person.lastName || !person.birthDate}
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