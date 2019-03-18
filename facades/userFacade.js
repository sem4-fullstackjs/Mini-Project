// var mongoose = require("mongoose");
var User = require("../models/User");

function getAllUsers() {
  return User.find({}).exec()
}

function addUser(firstName, lastName, userName, password, email) {
  return newUser = User({ firstName, lastName, userName, password, email }).save()
}

function findByUsername(username) {
  return User.findOne({ userName: username }).exec()
}

function findById(user_id) {
  return User.findById({ _id: user_id }).exec()
}

// TODO: Rewrite this function!
async function addJobToUser(user_id, jobs) {
  const users = await User.find({ _id: user_id }).exec()

  let user = users[0]
  user.job.push(jobs)

  const response = await user.save()
  return response

  //return userJob = User({User: user, job: jobs}).save()
}

module.exports = {
  getAllUsers,
  addUser,
  findByUsername,
  findById,
  addJobToUser
}

