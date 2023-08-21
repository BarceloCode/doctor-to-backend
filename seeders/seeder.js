const mongoose = require("mongoose");
const cosmetologistUser = require("../models//CosmotologistModel");
const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });
const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TZ);
const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
// Conecta a la base de datos
db.connect();
// HASHING PASSWORD
const salt = parseInt(process.env.SALT_KEY);
const secretpassword = "SecretPassword24@";
const hash = bcrypt.hashSync(secretpassword, salt);
const sampleUsers = [
  {
    name: "Carlos Ezequiel",
    full_lastname: "Gonzalez Tiscareño",
    email: "carlos@mail.com",
    password: hash,
    phone: "3314372628",
    location: "Guadalajara",
    birthday: "1998-12-17",
    gender: "male",
  },
];

const seedDatabase = async () => {
  try {
    // Elimina todos los documentos existentes en la colección de usuarios
    await cosmetologistUser.deleteMany();

    await cosmetologistUser.insertMany(sampleUsers);

    console.log("Datos de muestra insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar datos de muestra:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
