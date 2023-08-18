const express = require('express')
const db = require('./db.js')
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');


const app = express();
const port = 3000;
//Coneccion to Mongo
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes 

const PatientRoute = require("./routes/PatientRoute.js");
const ExpedientRoute =  require("./routes/ExpedientRoute.js");
const CosmoRoutes = require("./routes/CosmotologistRouter.js");
//const PathologicalRoute = require("./routes/PathologicalRoute.js")

app.use('/usc/patient', PatientRoute);
app.use('/usc/expedient', ExpedientRoute);
//app.use('/usc/pathological', PathologicalRoute);
app.use("/usc/cosmotologist", CosmoRoutes);

//Middleware a futuro para la autenticacion
//app.use(authMiddleware);



app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
