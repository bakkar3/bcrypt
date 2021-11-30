import express from "express";
import mongoose from "mongoose";
import * as usersController from "./controller/usersController.js";
import UsersModel from "./models/userModel.js";

import cors from "cors";
import bcrypt from "bcrypt";

mongoose.connect("mongodb://localhost:27017/bcrypt");
const PORT = 3005;
const password = "password";
const app = express(); // create an API instance
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const login = req.body.login;
  const password1 = req.body.password1;
  const password2 = req.body.password2;
  const user = await usersController.getUser(login);

  if (user.length > 0) {
    res.status(403).send({ err: "User already exists" });
  } else if (password1 !== password2) {
    res.status(403).send({ err: "password1 und password2 muss gleish sein" });
  } else {
    bcrypt.genSalt().then((salt) => {
      bcrypt.hash("password", salt).then((hash) => {
        const user = new UsersModel({
          login: req.body.login,
          hash: hash,
        });
        user.save((err) => {
          if (err) {
            res.json({ error: "can not add user" });
          } else {
            res.json({ message: "user added" });
          }
        });
      });
    });
  }
});

app.get("/", (req, res) => {
  res.send("<h2> bcrypt</h2>");
});



app.listen(PORT, () => console.log(`API started on http://localhost:${PORT}`));
