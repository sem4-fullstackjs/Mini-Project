// var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");
var User = require("../models/User")

function getAllBlogs() {
  return LocationBlog.find({}).exec()
}

function addLocationBlog(info, img, longitude, latitude, author, created) {
  return LocationBlog({ info, img, pos: { longitude, latitude }, author, created }).save()
}

// TODO: Rewrite this function!
async function likeLocationBlog(user_id, locationblog_id) {
  const user = await User.find({ _id: user_id }).exec()
  const locationblogs = await LocationBlog.find({ _id: locationblog_id })

  let locationblog = locationblogs[0]
  locationblog.likedBy.push(user[0]._id)

  const response = await locationblog.save()
  return response
}

function findByInfo(info) {
  return LocationBlog.findOne({ info }).exec()
}

function findById(id) {
  return LocationBlog.findById({ _id: id }).exec()
}


module.exports = {
  findByInfo,
  findById,
  getAllBlogs,
  addLocationBlog,
  likeLocationBlog
}