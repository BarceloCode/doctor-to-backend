const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const businessUnitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clinic",
    required: true,
  },
  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "treatment",
    required: true,
  },
});
businessUnitSchema.plugin(mongoosePaginate);
const BusinessUnit = mongoose.model("BusinessUnit", businessUnitSchema);
BusinessUnit.paginate().then({});

module.exports = BusinessUnit;
