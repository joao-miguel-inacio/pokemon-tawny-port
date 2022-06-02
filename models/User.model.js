import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500
    },
    password: {
      type: String,
      required: true
    },
    pokemon: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
