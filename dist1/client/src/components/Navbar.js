"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
function Navbar() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.AppBar, { position: 'static', color: 'transparent' },
            react_1.default.createElement(material_1.Container, null,
                react_1.default.createElement(material_1.Toolbar, null,
                    react_1.default.createElement(material_1.Typography, { sx: { flexGrow: 1 } },
                        react_1.default.createElement(react_router_dom_1.Link, { to: "/", style: { textDecoration: 'none' } }, "Person List")),
                    react_1.default.createElement(material_1.Button, { variant: 'contained', color: 'primary', onClick: () => navigate("/persons/new") }, "New User"))))));
}
exports.default = Navbar;
