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
const material_1 = require("@mui/material");
const react_2 = require("react");
const react_router_dom_1 = require("react-router-dom");
function PersonForm() {
    const [person, setPerson] = (0, react_2.useState)({
        name: '',
        lastName: '',
        birthDate: null,
    });
    const [loading, setLoading] = (0, react_2.useState)(false);
    const [editing, setEditing] = (0, react_2.useState)(false);
    const [nameErrorMessage, setNameErrorMessage] = (0, react_2.useState)('');
    const [lastNameErrorMessage, setLastNameErrorMessage] = (0, react_2.useState)('');
    const [birthDateErrorMessage, setBirthDateErrorMessage] = (0, react_2.useState)('');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const params = (0, react_router_dom_1.useParams)();
    // For submitting the form
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setLoading(true);
        if (editing) {
            yield fetch(`http://localhost:4000/persons/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(person)
            });
        }
        else {
            yield fetch('http://localhost:4000/persons/', {
                method: 'POST',
                body: JSON.stringify(person),
                headers: { "Content-Type": "application/json" }
            });
        }
        setLoading(false);
        navigate("/");
    });
    // For handling user input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validate name
        if (name === 'name') {
            if (!/^[A-Za-z]*$/.test(value)) {
                setNameErrorMessage('Please enter letters only');
            }
            else if (value.length >= 50) {
                setNameErrorMessage('Name is too long');
            }
            else {
                setNameErrorMessage('');
            }
        }
        // Validate lastName
        if (name === 'lastName') {
            if (!/^[A-Za-z]*$/.test(value)) {
                setLastNameErrorMessage('Please enter letters only');
            }
            else if (value.length >= 50) {
                setLastNameErrorMessage('Last name is too long');
            }
            else {
                setLastNameErrorMessage('');
            }
        }
        // Validate birthDate
        if (name === 'birthDate') {
            const enteredDate = new Date(value);
            const minDate = new Date('1900-01-01');
            const maxDate = new Date(); //today
            if (isNaN(enteredDate.getFullYear()) || enteredDate < minDate || enteredDate > maxDate) {
                setBirthDateErrorMessage(`Invalid date`);
            }
            else {
                setBirthDateErrorMessage('');
            }
        }
        setPerson(Object.assign(Object.assign({}, person), { [name]: value }));
    };
    // Retrieves the person to edit
    const loadPerson = (id) => __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`http://localhost:4000/persons/${id}`);
        const data = yield res.json();
        setPerson({ name: data.name, lastName: data.lastName, birthDate: data.birthDate });
        setEditing(true);
    });
    (0, react_2.useEffect)(() => {
        if (params.id) {
            loadPerson(params.id);
        }
    }, [params.id]);
    // Returns the form to create a new person or edit an existing one
    return (react_1.default.createElement(material_1.Grid, { container: true, direction: "column", alignItems: "center", justifyContent: "center" },
        react_1.default.createElement(material_1.Grid, { item: true, xs: 3 },
            react_1.default.createElement(material_1.Card, { sx: { mt: 5 } },
                react_1.default.createElement(material_1.Typography, { variant: "subtitle1", component: "div", sx: { textAlign: 'center', mt: 2 } }, editing ? "Update" : "New person"),
                react_1.default.createElement(material_1.CardContent, null,
                    react_1.default.createElement("form", { onSubmit: handleSubmit },
                        react_1.default.createElement(material_1.TextField, { variant: 'filled', label: 'Enter name', sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "name", value: person.name, onChange: handleChange, inputProps: { maxLength: 50 } }),
                        nameErrorMessage && react_1.default.createElement(material_1.Typography, { color: "error" }, nameErrorMessage),
                        react_1.default.createElement(material_1.TextField, { variant: 'filled', label: 'Enter last name', sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "lastName", value: person.lastName, onChange: handleChange, inputProps: { maxLength: 50 } }),
                        lastNameErrorMessage && react_1.default.createElement(material_1.Typography, { color: "error" }, lastNameErrorMessage),
                        react_1.default.createElement(material_1.TextField, { variant: "filled", label: "Select a date", type: "date", sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "birthDate", value: person.birthDate, onChange: handleChange, inputProps: {
                                style: {
                                    height: '40px'
                                },
                            } }),
                        birthDateErrorMessage && react_1.default.createElement(material_1.Typography, { color: "error" }, birthDateErrorMessage),
                        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, justifyContent: "space-between" },
                            react_1.default.createElement(material_1.Grid, { item: true },
                                react_1.default.createElement(material_1.Button, { variant: 'contained', color: 'inherit', type: 'submit', onClick: () => navigate("/") }, "Cancel")),
                            react_1.default.createElement(material_1.Grid, { item: true },
                                react_1.default.createElement(material_1.Button, { variant: 'contained', color: 'primary', type: 'submit', disabled: !person.name || !/^[A-Za-z]*$/.test(person.name) ||
                                        !person.lastName || !/^[A-Za-z]*$/.test(person.lastName) || !person.birthDate || birthDateErrorMessage }, loading ? react_1.default.createElement(material_1.CircularProgress, { color: 'inherit', size: 24 }) : 'Save')))))))));
}
exports.default = PersonForm;
;
