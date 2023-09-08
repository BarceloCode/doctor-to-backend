const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const baseSchema = require("../models/baseSchema");

const businessUnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  clinic: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "clinic",
    required: true,
  },              
  treatment: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "treatment",
    required: true,
    unique: true,
  },
});
businessUnitSchema.add(baseSchema);
businessUnitSchema.plugin(mongoosePaginate);
const BusinessUnit = mongoose.model("BusinessUnit", businessUnitSchema);
BusinessUnit.paginate().then({});

module.exports = BusinessUnit;
