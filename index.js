"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';
const randomName = faker_1.faker.person.fullName(); // Rowan Nikolaus
console.log("randomName:", randomName);
const randomEmail = faker_1.faker.internet.email(); // Kassandra.Haley@erich.biz
console.log("randomEmail:", randomEmail);
