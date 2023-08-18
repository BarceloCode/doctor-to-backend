const express = require("express");
const db = require("./db.js");
const cors = require("cors");
// const userRoutes = require('./routes/userRoutes');
<<<<<<< HEAD


=======
const CosmoRoutes = require("./routes/CosmotologistRouter");
>>>>>>> 62bb495f249353b02e074b6c9dec86b62b96f490
const app = express();
const port = 3000;
//Coneccion to Mongo
db.connect();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes

<<<<<<< HEAD
// Routes 

const PatientRoute = require("./routes/PatientRoute.js");
const ExpedientRoute =  require("./routes/ExpedientRoute.js");
const CosmoRoutes = require("./routes/CosmotologistRouter.js");
//const PathologicalRoute = require("./routes/PathologicalRoute.js")
const PatientRoute = require("./routes/PatientRoute.js");

app.use('/usc/patient', PatientRoute);
app.use('/usc/expedient', ExpedientRoute);
//app.use('/usc/pathological', PathologicalRoute);
app.use("/usc/cosmotologist", CosmoRoutes);

//Middleware a futuro para la autenticacion
//app.use(authMiddleware);


=======
const PatientRoute = require("./routes/PatientRoute.js");

app.use("/usc/patient", PatientRoute);
app.use("/usc/cosmotologist", CosmoRoutes);
>>>>>>> 62bb495f249353b02e074b6c9dec86b62b96f490

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
