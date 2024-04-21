const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  calculations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calculations",
    },
  ],
});

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
