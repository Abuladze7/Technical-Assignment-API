const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// import dotenv from 'dotenv'
// dotenv.config()

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(201).send({
      token,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new Error("Invalid email or password"));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new Error("Invalid email or password"));
    }

    const token = signToken(user._id);

    res.status(200).send({
      token,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.protected = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new Error("You are not logged in! Please log in to get access")
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(404).send(err);
  }
};
