require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Message = require("./models/message");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
    .connect(`${process.env.MONGO_DB_KEY}`)
    .then(() => console.log(`Connected To MongoDB`))
    .catch((err) => {
        console.log("Error Connecting To MongoDB", err);
    });

// endpoint for registration of the user
app.post("/register", (req, res) => {
    const { name, email, password, image } = req.body;

    const user = User.findOne({ email });

    if (user) {
        return res.status(400).json({ message: "The User Already Exist" });
    }

    const newUser = new User({ name, email, password, image });
    newUser
        .save()
        .then(() => {
            res.status(200).json({ message: "User Registered Successfully" });
        })
        .catch((err) => {
            console.log(`Error Registering User`, err);
            res.status(500).json({ message: "Error REgistering The User!" });
        });
});

app.listen(port, () => {
    console.log("Server Is Running On Port 8000");
});
