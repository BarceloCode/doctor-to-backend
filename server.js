const express = require('express')
const db = require('./db.js')
// const userRoutes = require('./routes/userRoutes');


const app = express()
const port = 3000
//Coneccion to Mongo
db.connect();

app.use(express.json());


//Middleware a futuro para la autenticacion
//app.use(authMiddleware);

// app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server Runnig on ${process.env.HOSTNAME}:${port}`)
})