"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const typeorm_1 = require("typeorm");
var AgeCategory;
(function (AgeCategory) {
    AgeCategory["Child"] = "Ni\u00F1o";
    AgeCategory["Teen"] = "Adolescente";
    AgeCategory["Adult"] = "Adulto";
    AgeCategory["Octagenarian"] = "Octagenario";
})(AgeCategory || (AgeCategory = {}));
let Person = class Person extends typeorm_1.BaseEntity {
    setAgeCategory() {
        if (!this.birthDate) {
            throw new Error('birthDate is required');
        }
        const age = this.setAge(this.birthDate);
        if (age < 11) {
            this.ageCategory = AgeCategory.Child;
        }
        else if (age < 18) {
            this.ageCategory = AgeCategory.Teen;
        }
        else if (age < 80) {
            this.ageCategory = AgeCategory.Adult;
        }
        else {
            this.ageCategory = AgeCategory.Octagenarian;
        }
    }
    setAge(date) {
        const currentDate = new Date();
        const birthDate = this.birthDate;
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        if (currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDay() <= birthDate.getDay())) {
            age--;
        }
        return age;
    }
};
exports.Person = Person;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Person.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Person.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "ageCategory", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "setAgeCategory", null);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)()
], Person);
