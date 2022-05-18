const moongose = require("mongoose");

const goalSchema = moongose.Schema(
  {
    user: {
        type: moongose.Schema.Types.ObjectId, // this is the user id
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

module.exports = moongose.model("Goal", goalSchema);
