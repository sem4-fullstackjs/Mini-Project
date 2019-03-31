// var mongoose = require("mongoose");
var LocationBlog = require('../models/LocationBlog')

function getAllBlogs() {
	return LocationBlog.find({}).exec()
}

function findByInfo(info) {
	return LocationBlog.findOne({ info }).exec()
}

function findById(id) {
	return LocationBlog.findById({ _id: id }).exec()
}

function addLocationBlog(info, img, longitude, latitude, author, created) {
	return LocationBlog({ info, img, pos: { longitude, latitude }, author, created }).save()
}

// TODO: Rewrite this function - Should not allow users to like the same post more then once!
async function likeLocationBlog(userid, blogid) {
	return LocationBlog.findOneAndUpdate(
		{ _id: blogid },
		{ $push: { likedBy: userid } },
		{ new: true }
	).exec()
}

module.exports = {
	getAllBlogs,
	findByInfo,
	findById,
	addLocationBlog,
	likeLocationBlog
}
