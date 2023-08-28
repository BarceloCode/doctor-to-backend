const express = require("express");
const db = require("./db.js");
const morgan = require('morgan');
const cors = require("cors");
// const userRoutes = require('./routes/userRoutes');
const app = express();
const port = process.env.PORT;
//Coneccion to Mongo
db.connect();
app.use(morgan('dev'));
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes

const HistoryRouter = require("./routes/HistoryRoute.js");
const ProductsRoute = require("./routes/ProductsRoute.js");
const TreatmentRoute = require("./routes/TreatmentRoute.js");
const PatientRoute = require("./routes/PatientRoute.js");
const ExpedientRoute =  require("./routes/ExpedientRoute.js");
const CosmoRoutes = require("./routes/CosmotologistRouter.js");
const BunitRoute = require("./routes/BusinessUnitRoute.js");
const ConsultingRoomRoute = require("./routes/ConsultingRoomRoute.js");
const MachineRoute = require("./routes/MachineRoute.js");
const ApointmentRoute = require("./routes/ApointmentRoute.js");
const ClinicRoute = require("./routes/ClinicRoute.js");

app.use("/usc/products", ProductsRoute)
app.use("/usc/services", TreatmentRoute);
app.use("/usc/patient", PatientRoute);
app.use("/usc/cosmotologist", CosmoRoutes);
app.use('/usc/expedient', ExpedientRoute);
app.use('/usc/history', HistoryRouter);
app.use('/usc/businessunit', BunitRoute);
app.use('/usc/consultingroom', ConsultingRoomRoute);
app.use('/usc/machines', MachineRoute);
app.use('/usc/apointment', ApointmentRoute);
app.use('/usc/clinic', ClinicRoute);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
