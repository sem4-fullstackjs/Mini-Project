// var mongoose = require("mongoose");
var User = require('../models/User')

function getAllUsers() {
	return User.find({}).exec()
}

function addUser(firstName, lastName, userName, password, email) {
	return (newUser = User({ firstName, lastName, userName, password, email }).save())
}

function findByUsername(username) {
	return User.findOne({ userName: username }).exec()
}

function findById(user_id) {
	return User.findById({ _id: user_id }).exec()
}

async function addJobToUser(user_id, jobs) {
	const user = await User.findOne({ _id: user_id }).exec()

	user.job.push(jobs)

	const response = await user.save()
	return response
}

module.exports = {
	getAllUsers,
	findByUsername,
	findById,
	addUser,
	addJobToUser
}
