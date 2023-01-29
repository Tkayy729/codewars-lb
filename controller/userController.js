const User = require("../db/models/userModel");
const generatewebToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const alreadyExists = await User.findOne({ email });

  if (alreadyExists) {
    res.status(400).send("User Already Exist");
    throw new Error("User Already exists");
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser)
    res
      .status(200)
      .json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.password,
        token: generatewebToken(newUser._id),
      })
      .send("User registered successfully");

  res.send(400);
  throw new Error("Error occured!!");
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser && (await foundUser.matchPassword(password)))
    res.status(201).json({
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      token: generatewebToken(foundUser._id),
    });

  res.status(400);
  throw new Error("Invalid Email or Password");
};

module.exports = { registerUser, authUser };
