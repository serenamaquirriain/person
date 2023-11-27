"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const icons_material_1 = require("@mui/icons-material");
function Navbar() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.AppBar, { position: 'static', color: 'transparent' },
            react_1.default.createElement(material_1.Container, null,
                react_1.default.createElement(material_1.Toolbar, { sx: { justifyContent: 'space-between' } },
                    react_1.default.createElement(material_1.IconButton, { onClick: () => navigate("/"), "aria-label": "home" },
                        react_1.default.createElement(icons_material_1.Home, { style: { maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px' } })),
                    react_1.default.createElement(material_1.Button, { variant: 'contained', color: 'primary', onClick: () => navigate("/persons/new") }, "New Person"))))));
}
exports.default = Navbar;
