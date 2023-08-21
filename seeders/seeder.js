const mongoose = require("mongoose");
const cosmetologistUser = require("../models//CosmotologistModel");
const db = require("../db");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: "../.env" });
// Conecta a la base de datos
db.connect();
// HASHING PASSWORD
const salt = parseInt(process.env.SALT_KEY);
const secretpassword = "SecretPassword24@";
const hash = bcrypt.hashSync(secretpassword, salt);
const sampleUsers = [
  {
    name: "Admin AdminSecondName",
    full_lastname: "AdminLastname Tiscareño",
    email: "admin@admin.com",
    password: hash,
    phone: "9999999999",
    location: "Guadalajara",
    birthday: "1998-12-17",
    gender: "Male",
    permissons:{
      role:'administrator',
      read: true,
      edit: true,
      delete: true

    }
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
