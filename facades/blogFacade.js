// var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");
var User = require("../models/User")

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

// TODO: Rewrite this function!
async function likeLocationBlog(user_id, locationblog_id) {
  const user = await User.findOne({ _id: user_id }).exec()
  const locationblog = await LocationBlog.findOne({ _id: locationblog_id })

  locationblog.likedBy.push(user._id)

  const response = await locationblog.save()
  return response
}


module.exports = {
  getAllBlogs,
  findByInfo,
  findById,
  addLocationBlog,
  likeLocationBlog
}