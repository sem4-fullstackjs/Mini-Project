// var mongoose = require("mongoose");
var LocationBlog = require('../models/LocationBlog')

function getAllLocationBlogs() {
	return LocationBlog.find({}).exec()
}

function findByInfo(info) {
	return LocationBlog.findOne({ info }).exec()
}

function findById(id) {
	return LocationBlog.findById({ _id: id }).exec()
}

async function addLocationBlog(info, img, pos, author) {
	var locationBlog = new LocationBlog({
		info,
		img,
		pos,
		author
	})
	await locationBlog.save()
	return locationBlog
}

// TODO: Rewrite this function - Should not allow users to like the same post more then once!
async function likeLocationBlog(userid, blogid) {
	const p = await LocationBlog.findById(blogid)
	if (p.likedBy.indexOf(userid) >= 0) {
		throw new Error('You have already liked this blog')
	}
	return LocationBlog.findOneAndUpdate(
		{ _id: blogid },
		{ $push: { likedBy: userid } },
		{ new: true }
	).exec()
}

module.exports = {
	getAllLocationBlogs,
	findByInfo,
	findById,
	addLocationBlog,
	likeLocationBlog
}
