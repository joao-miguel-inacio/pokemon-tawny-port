const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    username: {
      type: String,
      unique: true
    },
    password: String,
    //level: Number
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
