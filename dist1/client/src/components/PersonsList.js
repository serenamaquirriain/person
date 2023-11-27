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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const material_1 = require("@mui/material");
//Card, CardContent, Typography
const x_data_grid_1 = require("@mui/x-data-grid");
const react_router_dom_1 = require("react-router-dom");
function PersonList() {
    const [persons, setPersons] = (0, react_2.useState)([]);
    //const [sortBy, setSortBy] = useState('name'); // Default sorting field
    //const [sortOrder, setSortOrder] = useState('ASC'); // Default sorting order
    const navigate = (0, react_router_dom_1.useNavigate)();
    const loadPersons = () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:4000/persons');
        const data = yield response.json();
        const formattedPersons = data.map((person) => (Object.assign(Object.assign({}, person), { formattedDate: new Date(person.birthDate).toLocaleDateString() })));
        setPersons(formattedPersons);
        //console.log(data)
        //setPersons(data)
    });
    (0, react_2.useEffect)(() => {
        loadPersons();
    }, []);
    //?sortBy=name%sortOrder=ASC
    //http://localhost:4000/persons?sortBy=name%sortOrder=ASC
    const handleDelete = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            //borro del back
            yield fetch(`http://localhost:4000/persons/${id}`, {
                method: "DELETE",
            });
            //borro del front  
            setPersons(persons.filter(person => (person.id).toString() !== id));
        }
        catch (error) {
            console.log(error);
        }
    });
    const handleSort = (sortOrder, sortBy) => __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('button clicked');
            // Specify your sortBy and sortOrder values
            //const sortBy = 'name'; // Replace with your desired field
            //const sortOrder = 'ASC'; // Replace with 'ASC' or 'DESC'
            //setSortBy(sortBy);
            //setSortOrder(sortOrder);
            // Construct the URL with the parameters
            const url = `http://localhost:4000/persons?sortBy=${sortBy}&sortOrder=${sortOrder}`;
            //const url = `http://localhost:4000/persons?sortBy=name&sortOrder=ASC`;
            // Make the request to your backend
            const response = yield fetch(url);
            const data = yield response.json();
            const formattedPersons = data.map((person) => (Object.assign(Object.assign({}, person), { formattedDate: new Date(person.birthDate).toLocaleDateString() })));
            setPersons(formattedPersons);
            //setPersons(data);
            // Do something with the data (update state, display, etc.)
            console.log(data);
        }
        catch (error) {
            console.error('Error fetching persons:', error);
        }
    });
    //useEffect(()=>{
    //loadPersons();
    //}, [sortBy, sortOrder])
    const personsToRows = (persons) => {
        return persons.map((person, index) => ({
            id: person.id,
            name: person.name,
            lastName: person.lastName,
            age: person.age,
            ageCategory: person.ageCategory,
            birthDate: person.formattedDate,
            actions: (react_1.default.createElement("div", null,
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => navigate(`/persons/${person.id}/edit`) }, "Edit"),
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "secondary", onClick: () => handleDelete(person.id.toString()) }, "Delete"))),
        }));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Person List"),
        react_1.default.createElement(x_data_grid_1.DataGrid, { autoHeight: true, rows: personsToRows(persons), columns: [
                { field: 'name', headerName: 'Nombre', sortable: false, flex: 1 },
                { field: 'lastName', headerName: 'Apellido', sortable: false, flex: 1 },
                { field: 'age', headerName: 'Edad', sortable: false, flex: 1 },
                { field: 'ageCategory', headerName: 'Grupo etario', sortable: false, flex: 1 },
                { field: 'birthDate', headerName: 'Fecha de nacimiento', sortable: false, flex: 1 },
                { field: 'actions', headerName: 'Actions', sortable: false, flex: 1, }
            ] }),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('ASC', 'name') }, "Name ascending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('DESC', 'name') }, "Name descending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('ASC', 'lastName') }, "lastName ascending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('DESC', 'lastName') }, "lastName descending")));
}
exports.default = PersonList;
