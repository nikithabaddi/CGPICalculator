const mongoose = require("mongoose");

const calculationsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "log_reg_form",
  },
  sgpa: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Calculations", calculationsSchema);