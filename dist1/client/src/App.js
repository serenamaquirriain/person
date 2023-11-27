"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./App.css");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const PersonList_1 = __importDefault(require("./components/PersonList"));
const PersonForm_1 = __importDefault(require("./components/PersonForm"));
const Navbar_1 = __importDefault(require("./components/Navbar"));
const material_1 = require("@mui/material");
function App() {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(Navbar_1.default, null),
        react_1.default.createElement(material_1.Container, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(PersonList_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/persons/new", element: react_1.default.createElement(PersonForm_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/persons/:id/edit", element: react_1.default.createElement(PersonForm_1.default, null) })))));
}
exports.default = App;
