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
const icons_material_1 = require("@mui/icons-material");
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
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => navigate(`/users/${person.id}/edit`) }, "Edit"),
                react_1.default.createElement(material_1.Button, { variant: "contained", color: "secondary", onClick: () => handleDelete(person.id.toString()) }, "Delete"))),
        }));
    };
    const rows = personsToRows(persons);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, "Person List"),
        react_1.default.createElement(material_1.TableContainer, { component: material_1.Paper },
            react_1.default.createElement(material_1.Table, { sx: { minWidth: 650 }, "aria-label": "simple table" },
                react_1.default.createElement(material_1.TableHead, null,
                    react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, { align: "right" }, "Name"),
                        react_1.default.createElement(material_1.IconButton, null,
                            react_1.default.createElement(icons_material_1.ArrowDropUp, null)),
                        react_1.default.createElement(material_1.TableCell, { align: "right" }, "Last Name"),
                        react_1.default.createElement(material_1.TableCell, { align: "right" }, "Age"),
                        react_1.default.createElement(material_1.TableCell, { align: "right" }, "Age Category"),
                        react_1.default.createElement(material_1.TableCell, { align: "right" }, "Birth Date"))),
                react_1.default.createElement(material_1.TableBody, null, rows.map((row) => (react_1.default.createElement(material_1.TableRow, { key: row.id, sx: { '&:last-child td, &:last-child th': { border: 0 } } },
                    react_1.default.createElement(material_1.TableCell, { component: "th", scope: "row" }, row.name),
                    react_1.default.createElement(material_1.TableCell, { align: "right" }, row.lastName),
                    react_1.default.createElement(material_1.TableCell, { align: "right" }, row.age),
                    react_1.default.createElement(material_1.TableCell, { align: "right" }, row.ageCategory),
                    react_1.default.createElement(material_1.TableCell, { align: "right" }, row.birthDate),
                    react_1.default.createElement(material_1.TableCell, { align: "right" }, row.actions))))))),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('ASC', 'name') }, "Name ascending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('DESC', 'name') }, "Name descending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('ASC', 'lastName') }, "lastName ascending"),
        react_1.default.createElement(material_1.Button, { variant: "contained", color: "inherit", onClick: () => handleSort('DESC', 'lastName') }, "lastName descending")));
}
exports.default = PersonList;
