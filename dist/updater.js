"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dailyUpdate = () => {
    console.log('ejecutando!!');
};
//corre a las 00:00 todos los dias
node_cron_1.default.schedule('* * * * *', dailyUpdate);
exports.default = dailyUpdate;
