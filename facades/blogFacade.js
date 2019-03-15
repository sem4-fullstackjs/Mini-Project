// var mongoose = require("mongoose");
var LocationBlog = require("../models/LocationBlog");

function getAllBlogs() {
  return LocationBlog.find({}).exec()
}

function addLocationBlog(info, img, longitude, latitude, author, created) {
  return newBLog = LocationBlog({ info, img, pos: { longitude, latitude }, author, created }).save()
}

function likeLocationBlog(id) {
  return null
  // Start by finding the desired blog
  // Update it so the likedBy array has the users ID in it.
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