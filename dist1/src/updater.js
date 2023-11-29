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
const Person_1 = __importDefault(require("./entities/Person"));
const db_1 = require("./db");
const typeorm_1 = require("typeorm");
// Updates the ages of persons whose birthday is today
const dailyUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    console.log(today);
    const todayMonth = today.getMonth() + 1; // Adds 1 because months are 0 indexed
    const todayDay = today.getDate();
    const personsToUpdate = yield db_1.AppDataSource.getRepository(Person_1.default).find({
        where: {
            // Compares month and date by using raw SQL
            birthDate: (0, typeorm_1.Raw)((Person) => `EXTRACT(MONTH FROM "Person"."birthDate") = ${todayMonth} AND EXTRACT(DAY FROM "Person"."birthDate") = ${todayDay}`),
        },
    });
    for (const person of personsToUpdate) {
        person.age += 1; // Increments the age by 1
        yield db_1.AppDataSource.getRepository(Person_1.default).save(person);
    }
});
exports.default = dailyUpdate;
