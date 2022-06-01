import mongoose from "mongoose";
const {Schema, model} = mongoose;

const pokemonSchema = new Schema(
  {
    name: String,
    id: Number,
    base_experience: Number,
    types: [String],
    height: Number,
    weight: Number,
    habitat: String,
    growth_rate: String,
    sprites: {
      front_default : String,
      back_default: String,
      front_shiny: String,
      back_shiny: String,
      front_animated: String,
      back_animated: String
    },
    evolution_chain: [String],
    egg_groups: [String],
    trainer: { type: Schema.Types.ObjectId, ref: "User" },
    nickname: String
    //signatureMove: String,
    //signatureMoveType: String
  },
  {
    timestamps: true,
  }
);

const Pokemon = model("Pokemon", pokemonSchema);

export default Pokemon;
