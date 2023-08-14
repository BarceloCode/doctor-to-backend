const express = require('express')
const db = require('./db.js')
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');


const app = express()
const port = 3000
//Coneccion to Mongo
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes 

const PatientRoute = require('./routes/PatientRoute.js');

app.use('/usc/patient', PatientRoute);

//Middleware a futuro para la autenticacion
//app.use(authMiddleware);

// app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`)
})