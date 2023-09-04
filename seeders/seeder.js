const mongoose = require("mongoose");
const cosmetologistUser = require("../models/CosmetologistModel");
const clinicSch = require("../models/ClinicModel");
const businessUnitSchema = require("../models/BusinessUnitModel");

const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });
// Conecta a la base de datos
db.connect();
// HASHING PASSWORD
const salt = parseInt(process.env.SALT_KEY);
const secretpassword = process.env.CANDY;
const hash = bcrypt.hashSync(secretpassword, salt);

// const sampleCosmotologist = [
//   {
//     name: "Admin AdminSecondName",
//     full_lastname: "AdminLastname Tiscareño",
//     email: "admin@admin.com",
//     password: hash,
//     phone: "1999999999",
//     location: "64e51ff9df3368e23996d5f3",
//     birthday: "1998-12-17",
//     gender: "Male",
//     permissions: {
//       role: "administrator",
//       read: true,
//       edit: true,
//       delete: true,
//     },
//     worktime: {
//       start: "1970-01-01T08:30:00",
//       end: "1970-01-01T20:30:00",
//     },
//     workdays: {
//       monday: true,
//       tuesday: true,
//       wednesday: true,
//       thursday: true,
//       friday: true,
//       saturday: false,
//       sunday: false,
//     },
//     businessUnit:"64e5257c49921a1f95d84387"
//   },
// ];
// const sampleClinic = [
//   {
//     name: "Clinic Arcangel de Jesus",
//     address: "Av. Mexico 1234",
//     description:"Example of description",
//     worktime: {
//       start: "08:00AM",
//       end: "20:00PM",
//       days: "Lunes a Viernes",
//     },
//     phone: "1234567891",
//   },
// ];

const seedDatabase = async () => {
  try {
    // Elimina todos los documentos existentes en la colección de usuarios
    // await cosmetologistUser.collection.drop();
    // await businessUnitSchema.collection().drop();
    await businessUnitSchema.collection.drop();
    //Inserta los datos a la base de datos
    // await clinicSch.insertMany(sampleClinic);
    // await cosmetologistUser.insertMany(sampleCosmotologist);
    console.log("Datos de muestra insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos de muestra:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
