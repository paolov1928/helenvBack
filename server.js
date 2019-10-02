require("dotenv").config()

const express = require("express"),
  app = express(),
  port = process.env.PORT,
  mongoose = require("mongoose"),
  Cake = require("./api/models/cakeListModel"), //created model loading here
  bodyParser = require("body-parser")
const cors = require("cors")
const mongodbUri = require("mongodb-uri")

const connectionString = mongodbUri.formatMongoose(process.env.MONGODB_URI)

const localConnectionString = "mongodb://localhost/Cakedb"

// mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect(localConnectionString)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

var routes = require("./api/routes/cakeListRoutes") //importing route
routes(app) //register the route

app.listen(port)

console.log("cake list RESTful API server started on: " + port)

// Example post request
// fetch("http://localhost:1337/cakes", {
//   method: "post",
//   body: JSON.stringify({ name: "Paolo" }),
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json"
//   }
// })
//   .then(j => j.json())
//   .then(d => console.log(d))
