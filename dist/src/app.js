"use strict";
//configuarcion de express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(person_routes_1.default);
//next es un callback y permite que continue con otra funcion
app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    });
});
exports.default = app;
