// var mongoose = require("mongoose");
var User = require("../models/User");

function getAllUsers() {
  return User.find({}).exec()
}

function addUser(firstName, lastName, userName, password, email) {
  return newUser = User({ firstName, lastName, userName,  password, email }).save()
}

function findByUsername(username) {
  return User.findOne({ userName: username }).exec()
}

function findById(id) {
  return User.findById({ _id: id }).exec()
}

module.exports = {
  getAllUsers,
  addUser,
  findByUsername,
  findById
}

