"use strict"
const nodemailer = require("nodemailer")
var mongoose = require("mongoose"),
  Cake = mongoose.model("Cakes")

exports.list_all_cakes = function(req, res) {
  Cake.find({}, function(err, cake) {
    if (err) res.send(err)
    res.json(cake)
  })
}

exports.create_a_cake = function(req, res) {
  var new_cake = new Cake(req.body)
  var dataForEmail = req.body

  var smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  var mailOptions = {
    from: dataForEmail.email,
    to: process.env.EMAIL_USER + "@gmail.com",
    subject: "New cake alert",
    html: `<p>name: ${dataForEmail.name}</p>
          <p>email: ${dataForEmail.email}</p>
          <p>message: ${dataForEmail.message}</p>`
  }

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      res.send(error)
    } else {
      res.send("Success")
    }
    smtpTransport.close()
  })
  new_cake.save(function(err, cake) {
    if (err) res.send(err)
    res.json(cake)
  })
}

exports.read_a_cake = function(req, res) {
  Cake.findById(req.params.cakeId, function(err, cake) {
    if (err) res.send(err)
    res.json(cake)
  })
}

exports.update_a_cake = function(req, res) {
  Cake.findOneAndUpdate(
    { _id: req.params.cakeId },
    req.body,
    { new: true },
    function(err, cake) {
      if (err) res.send(err)
      res.json(cake)
    }
  )
}

exports.delete_a_cake = function(req, res) {
  Cake.remove(
    {
      _id: req.params.cakeId
    },
    function(err, cake) {
      if (err) res.send(err)
      res.json({ message: "Cake successfully deleted" })
    }
  )
}
