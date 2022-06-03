const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Register new user
//@route  POST /api/users/
//@access Puplic
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  /* This is a validation check to make sure that the user has entered all the required fields. */
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  /* Checking to see if the user exists in the database. */
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //  hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //  Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User could not be created");
  }
});

//@desc   login user
//@route  POST /api/users/login
//@access Puplic
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc   Get user data
//@route  GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json(req.user);
});

//  generate JWT
const generateToken = (id) => {
  // jwt.sign(payload, secretOrPrivateKey, [options, callback])
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', //fix later
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
