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
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
app.post(
    "/register",
    [
        body("name")
            .notEmpty()
            .withMessage("The Name Is Required")
            .isString()
            .withMessage("Name Should Be String"),
        body("email").notEmpty().withMessage("The Email Is Required").isEmail(),
        body("password")
            .notEmpty()
            .withMessage("The Password Is Required")
            .isLength({ min: 6 })
            .withMessage("password Should Be At Less 6 Character"),
        body("image").notEmpty().withMessage("The Image Should Not Be Empty"),
    ],
    async (req, res) => {
        try {
            const { body: data } = req;
            const result = validationResult(req);

            if (!result.isEmpty()) {
                return res.status(400).send("Invalid Data");
            }

            const user = await User.findOne({ email: data.email });

            if (user) {
                return res
                    .status(400)
                    .json({ message: "The User Already Exist" });
            }

            data.password = hashPassword(data.password);

            const newUser = new User({ ...data });

            newUser.save();

            res.status(200).json({ message: "User Registered Successfully" });
        } catch (err) {
            console.log(`Error Registering User`, err);
            res.status(500).json({
                message: "Error Registering The User!",
            });
        }
    }
);

// endpoint for logging in of the user
app.post(
    "/login",
    [
        body("email").notEmpty().withMessage("Email Should Not Be Empty"),
        body("password").notEmpty().withMessage("Password Should Not Be Empty"),
    ],
    async (req, res) => {
        try {
            const { body: data } = req;
            const result = validationResult(req);

            if (!result.isEmpty()) {
                return res.status(400).json({ message: "Invalid Data" });
            }

            const user = await User.findOne({ email: data.email });

            if (!user)
                return res.status(404).json({ message: "User Not Found" });

            const isMatch = await bcrypt.compare(data.password, user.password);

            if (!isMatch)
                return res.status(401).json({ message: "Invalid Credentials" });

            const token = createToken(user._id);

            res.status(200).json({ token });
        } catch (err) {
            console.log("Error Login", err);
            res.status(500).json({ message: "Login Failed" });
        }
    }
);

// endpoint to access all the users except the use who's is currently logged in

app.get("/users/:userId", (req, res) => {
    const loggedInUserId = req.params.userId;

    User.find({ _id: { $ne: loggedInUserId } }) //+ new => Not Equal
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log("Error Find Users");
            res.status(500).json({ message: "Fetch The Users Failed" });
        });
});

// end point to send a request to a user
app.post("/friend-request", async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;

    try {
        //! Update The Recipients's FriendRequestsArray
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { friendRequests: currentUserId },
        });

        //! Update The Sender's SentFriendRequests Array
        await User.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequest: selectedUserId },
        });

        res.sendStatus(200);
    } catch (err) {
        console.log("Error Request Friend", err);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log("Server Is Running On Port 8000");
});

function createToken(userId) {
    const payload = {
        userId,
    };

    const token = jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, {
        expiresIn: "1h",
    });

    return token;
}

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}
