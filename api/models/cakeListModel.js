"use strict"
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var CakeSchema = new Schema({
  name: {
    type: String,
    required: "Kindly enter the name of the cake orderer"
  },
  email: {
    type: String,
    required: "Kindly enter the email of the cake orderer"
  },
  message: {
    type: String,
    required: "Kindly enter something about the cake order"
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  drip: {
    type: [
      {
        type: String,
        enum: ["yellow", "green", "red",'white']
      }
    ],
    default: ["white"]
  },
  topping: {
    type: [
      {
        type: String,
        enum: ["sprinkles", "chocolate balls", "mars bars",'nuts', 'plain']
      }
    ],
    default: ["plain"]
  },
  base: {
    type: [
      {
        type: String,
        enum: ["chocolate", "vanilla", "carrot",'toffee', 'marble', 'sponge']
      }
    ],
    default: ["sponge"]
  },
})

module.exports = mongoose.model("Cakes", CakeSchema)

// Mongoose allows for the schema to be connected to MongoDB
