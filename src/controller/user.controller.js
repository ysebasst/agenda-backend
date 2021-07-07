const { genSalt, hash, compare } = require("bcrypt");
const User = require("../models/user.model");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const controller = {};

controller.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // VALIDATE USER
    const { error } = schemaRegister.validate({ name, email, password });

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
        message: "registration error",
      });
    }

    // VALIDATE UNIQUE EMAIL
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({
        error: "email already registered",
        message: "email already registered",
      });
    }

    const salt = await genSalt(10);
    const passwordEncrypt = await hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: passwordEncrypt,
    });
    const userSaved = await newUser.save();
    res.json({
      error: null,
      message: "registered user",
      data: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "error when registering user" });
  }
};

controller.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        error: "Email or password was not correct",
        message: "Email or password was not correct",
      });
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        error: "Email or password was not correct",
        message: "Email or password was not correct",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_SECRET
    );
    res.header("auth-token", token).json({
      error: null,
      message: "session started",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, message: "failed to login" });
  }
};

module.exports = controller;
