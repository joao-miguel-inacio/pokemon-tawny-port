const { Schema, model } = require("mongoose");

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

module.exports = Pokemon;
