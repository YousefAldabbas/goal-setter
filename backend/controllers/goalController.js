/* A middleware that wraps async functions to catch errors and pass them to the express error handler. */
const asyncHandler = require("express-async-handler");

//@desc   Get goals
//@route  GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get goals" });
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
  res.status(200).json({ message: "Set goals" });
});
//@desc   Update goal
//@route  PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
});
//@desc   Delete goal
//@route  DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
