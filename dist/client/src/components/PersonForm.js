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
    //const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const params = (0, react_router_dom_1.useParams)();
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
            yield fetch('http://localhost:4000/persons', {
                method: 'POST',
                body: JSON.stringify(person),
                headers: { "Content-Type": "application/json" }
            });
        }
        setLoading(false);
        navigate("/");
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Validate only letters for name
        if (name === 'name' && !/^[A-Za-z]*$/.test(value)) {
            setNameErrorMessage('Please enter only letters for the name.');
        }
        else {
            setNameErrorMessage('');
        }
        // Validate only letters for lastName
        if (name === 'lastName' && !/^[A-Za-z]*$/.test(value)) {
            setLastNameErrorMessage('Please enter only letters for the last name.');
        }
        else {
            setLastNameErrorMessage('');
            setPerson(Object.assign(Object.assign({}, person), { [name]: value }));
        }
    };
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
    return (react_1.default.createElement(material_1.Grid, { container: true, direction: "column", alignItems: "center", justifyContent: "center" },
        react_1.default.createElement(material_1.Grid, { item: true, xs: 3 },
            react_1.default.createElement(material_1.Card, { sx: { mt: 5 } },
                react_1.default.createElement(material_1.Typography, null, editing ? "Create Person" : "Update"),
                react_1.default.createElement(material_1.CardContent, null,
                    react_1.default.createElement("form", { onSubmit: handleSubmit },
                        react_1.default.createElement(material_1.TextField, { variant: 'filled', label: 'Enter your name', sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "name", value: person.name, onChange: handleChange }),
                        nameErrorMessage && react_1.default.createElement(material_1.Typography, { color: "error" }, nameErrorMessage),
                        react_1.default.createElement(material_1.TextField, { variant: 'filled', label: 'Enter your last name', sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "lastName", value: person.lastName, onChange: handleChange }),
                        lastNameErrorMessage && react_1.default.createElement(material_1.Typography, { color: "error" }, lastNameErrorMessage),
                        react_1.default.createElement(material_1.TextField, { variant: "filled", label: "Select a date", type: "date", sx: {
                                display: 'block',
                                margin: '.5rem 0'
                            }, name: "birthDate" // Set the appropriate name for your date field
                            , value: person.birthDate, onChange: handleChange }),
                        react_1.default.createElement(material_1.Button, { variant: 'contained', color: 'primary', type: 'submit', disabled: !person.name || !person.lastName || !person.birthDate }, loading ? react_1.default.createElement(material_1.CircularProgress, { color: 'inherit', size: 24 }) : 'Save')))))));
}
exports.default = PersonForm;
;
