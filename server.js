<<<<<<< HEAD
const express = require('express')
const db = require('./db.js')
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
=======
const express = require("express");
const db = require("./db.js");
const CosmoRoutes = require("./routes/CosmotologistRouter");
>>>>>>> 5fa5c5c (ADDED:CONTROLLER,VALIDATIONS,ROUTE FOR COSMOTOLOGIST AND SET TIMEZONE TO MEXICO CITY)

const app = express();
const port = 3000;
//Coneccion to Mongo
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

<<<<<<< HEAD
// Routes 

const PatientRoute = require('./routes/PatientRoute.js');

app.use('/usc/patient', PatientRoute);

=======
>>>>>>> 5fa5c5c (ADDED:CONTROLLER,VALIDATIONS,ROUTE FOR COSMOTOLOGIST AND SET TIMEZONE TO MEXICO CITY)
//Middleware a futuro para la autenticacion
//app.use(authMiddleware);

app.use("/cosmotologist", CosmoRoutes);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
