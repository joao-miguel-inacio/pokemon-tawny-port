import mongoose from "mongoose";
const {Schema, model} = mongoose;

const pokemonSchema = new Schema(
  {
    name: String,
    type: String,
    image: String,
    baseExperience: Number,
    //type: String
    //signatureMove: String,
    //signatureMoveType: String
  },
  {
    timestamps: true,
  }
);

const Pokemon = model("Pokemon", pokemonSchema);

export default Pokemon;
