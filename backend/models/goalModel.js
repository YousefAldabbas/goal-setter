const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId, // this is the user id
        required: true,
        ref: "User" // this is the name of the model
    },
    text: {
      type: String,
      required: [true, "Please add a goal"],
    },
  },
  {
    timestamps: true, // this will automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Goal", goalSchema);
