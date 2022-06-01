import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema(
  {
    name: String,
    imageUrl: String,
    username: {
      type: String,
      unique: true
    },
    password: String,
    pokemon: [{ type: Schema.Types.ObjectId, ref: "Pokemon" }]
    //level: Number
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
