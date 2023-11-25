import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'
import Menu from './components/Navbar'
import {Container} from '@mui/material'

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Container>
        <Routes>
          <Route path="/" element={<PersonList/>} />
          <Route path="/users/new" element={<PersonForm/>}/>
          <Route path="/users/:id/edit" element={<PersonForm/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;