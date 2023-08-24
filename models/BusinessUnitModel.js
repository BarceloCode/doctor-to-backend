const mongoose = require("mongoose");


const businessUnitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    consultingRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConsultingRoom"
}
});
const BusinessUnit = mongoose.model("BusinessUnit", businessUnitSchema);

module.exports = BusinessUnit;
