import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    profilePic: {
      type: String
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    pokemon: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }],
    team: { 
      type: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }],
      maxlength: 6
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
