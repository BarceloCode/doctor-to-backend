const express = require("express");
const db = require("./db.js");
const cors = require("cors");
// const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT;
//Coneccion to Mongo
db.connect();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes

const PatientRoute = require("./routes/PatientRoute.js");
const ExpedientRoute =  require("./routes/ExpedientRoute.js");
const CosmoRoutes = require("./routes/CosmotologistRouter.js");

app.use("/usc/patient", PatientRoute);
app.use("/usc/cosmotologist", CosmoRoutes);
app.use('/usc/expedient', ExpedientRoute);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
