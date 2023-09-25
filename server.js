const express = require("express");
const db = require("./db.js");
const morgan = require('morgan');
const cors = require("cors");
const mongoose = require('mongoose');
const validateToken = require("./middlewares/validate-token");
// const veryfyExcloudesRoutes = require("../middlewares/excloudesRoutes");
const permissionMiddleware = require("./middlewares/permissionsMiddleware");


mongoose.set('strictQuery', true);
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
app.use(validateToken);
app.use(permissionMiddleware);
// Routes

const HistoryRouter = require("./routes/HistoryRoute.js");
const ProductsRoute = require("./routes/ProductsRoute.js");
const TreatmentRoute = require("./routes/TreatmentRoute.js");
const PatientRoute = require("./routes/PatientRoute.js");
const ExpedientRoute =  require("./routes/ExpedientRoute.js");
const CosmeRoutes = require("./routes/CosmetologistRouter.js");
const BunitRoute = require("./routes/BusinessUnitRoute.js");
const ConsultingRoomRoute = require("./routes/ConsultingRoomRoute.js");
const MachineRoute = require("./routes/MachineRoute.js");
const ApointmentRoute = require("./routes/ApointmentRoute.js");
const ClinicRoute = require("./routes/ClinicRoute.js");
const ApointmentManagment = require("./routes/ApointmentManagmentRoute");
const NotesRoute = require("./routes/NotesRoute.js");
const SalesRoute = require("./routes/SalesRoute.js");

app.use("/usc/sales", SalesRoute);
app.use("/usc/notes", NotesRoute);
app.use("/usc/products", ProductsRoute)
app.use("/usc/services", TreatmentRoute);
app.use("/usc/patient", PatientRoute);
app.use("/usc/cosmotologist", CosmeRoutes);
app.use('/usc/expedient', ExpedientRoute);
app.use('/usc/history', HistoryRouter);
app.use('/usc/businessunit', BunitRoute);
app.use('/usc/consultingroom', ConsultingRoomRoute);
app.use('/usc/machines', MachineRoute);
app.use('/usc/apointment', ApointmentRoute);
app.use('/usc/clinic', ClinicRoute);
app.use('/usc/apointment/managment', ApointmentManagment);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`);
});
