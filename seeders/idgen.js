const mongoose = require('mongoose');

// Generar un ID ObjectId válido
for (let index = 0; index < 14; index++) {
    const id1 = new mongoose.Types.ObjectId();
    console.log(id1);
    
}
