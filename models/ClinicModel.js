const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
name:{
    type: String,
    required: true,
},
adress:{
    type: String,
    required: true,
},
worktime:{
    start:{
        type: String,
        required: true,
    },
    end:{
        type: String,
        required: true,
    },
    days:{
        type: String,
        required: true,
    }
},
phone:{
    type: String,
    required: true,
}
});
const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;