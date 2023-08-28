const mongoose = require("mongoose");
require("dotenv").config();

async function connect() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB establecida");
  } catch (err) {
    console.error("Error al conectar a MongoDB:", err);
  }
}

module.exports = { connect };
