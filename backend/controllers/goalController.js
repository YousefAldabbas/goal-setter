/* A middleware that wraps async functions to catch errors and pass them to the express error handler. */
const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
// to make sure every user can delete their own goals
const User = require("../models/userModel");
//@desc   Get goals
//@route  GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json(goals);
});

//@desc   Set goals
//@route  POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) => {
  // console.log(req.body)
  // to use req.body, you need to use body-parser
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});


//@desc   Update goal
//@route  PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  /* Checking if the user exists. */
  if (!req.user){
    res.status(404);
    throw new Error("User not found");
  }
  /* Checking if the user owns the goal. */
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //create new goal if it doesn't exist
  });

  res.status(200).json(updatedGoal);
});
//@desc   Delete goal
//@route  DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(404);
    throw new Error("Goal not found");
  }
  // const user = await User.findById(req.user.id)
  /* Checking if the user exists. */
  if (!req.user){
    res.status(404);
    throw new Error("User not found");
  }
  /* Checking if the user owns the goal. */
  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await Goal.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
