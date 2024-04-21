const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");
const CalculationModel = require("./models/CalculationsModel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/practice_mern");

app.post("/calculate", async(req, res) => {
  const { sgpa, userId } = req.body;

  const CalcResults = new CalculationModel({
   sgpa,
   userId,
  });

  const savedResults = await CalcResults.save();

  const updateUserInfo = await FormDataModel.findByIdAndUpdate(
    { _id: userId },
    {
      $push: { calculations: savedResults._id },
    },
    { new: true }
  )
    .populate("calculations")
    .exec();

  res.json({
    status: "success",
    data: updateUserInfo,
  });
});
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      res.json("Already registered");
    } else {
      FormDataModel.create(req.body)
        .then((log_reg_form) => res.json(log_reg_form))
        .catch((err) => res.json(err));
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  FormDataModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json({ status: "success", userId: user._id });
      } else {
        res.json("Wrong password");
      }
    }
    else {
      res.json("No records found");
    }
  });
});

app.listen(3001, () => {
  console.log("Server listining on http://127.0.0.1:3001");
});
