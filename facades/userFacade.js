var mongoose = require("mongoose");
var User = require("../models/User");

function getAllUsers() {
  return User.find({}).exec();
}

function addUser(firstName, lastName, userName, password, email) {
  //TBD -- Should make the test fail
  return null;
}

function findByUsername(username) {
  //TBD -- Should make the test fail
  return null;
}

function findById(id) {
  return User.findById({ _id:id }).exec();
}

module.exports = {
  getAllUsers,
  addUser,
  findByUsername,
  findById
}