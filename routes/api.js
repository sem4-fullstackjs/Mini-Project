var express = require('express')
var router = express.Router()
var userFacade = require('../facades/userFacade')
var blogFacade = require('../facades/blogFacade')
var loginFacade = require('../facades/loginFacade')
var mongoose = require('mongoose')

/* POST - login */
router.post('/login', async function(req, res, next) {
	const userName = req.body.userName
	const password = req.body.password
	const latitude = req.body.latitude
	const longitude = req.body.longitude
	const distance = req.body.distance * 1000
	// We multiply by 1000 because the user has to insert the distance in km
	// But we wan't to work with meters.

	const response = await loginFacade.login(userName, password, latitude, longitude, distance)

	if (response.msg) {
		res.statusCode = 403
	}

	res.json(response)
})

/* GET - all users */
router.get('/users', async function(req, res, next) {
	res.json({ users: await userFacade.getAllUsers() })
})

/* GET - user by userName */
router.get('/users/:username', async function(req, res, next) {
	var userName = req.params.username
	res.json({ users: await userFacade.findByUsername(userName) })
})

/* GET - user by id */
// seemse like findById dosnt work
router.get('/users/:id', async function(req, res, next) {
	var id = req.params.id
	res.json({ users: await userFacade.findById(id) })
})

/* POST - creates user */
router.post('/user/add', async function(req, res, next) {
	var body = req.body
	var firstName = body.firstName
	var lastName = body.lastName
	var userName = body.userName
	var password = body.password
	var email = body.email

	var user = await userFacade.addUser(firstName, lastName, userName, password, email)
	res.json(user)
})

/* GET - all locationblog */
router.get('/blogs', async function(req, res, next) {
	res.json({ blogs: await blogFacade.getAllLocationBlogs() })
})

/* GET - locationblog by id */
router.get('/blogs/:id', async function(req, res, next) {
	var id = req.params.id
	res.json({ blogs: await blogFacade.findById(id) })
})

/* POST - Create Locationnlog */
router.post('/blog/add', async function(req, res, next) {
	var info = req.body.info
	var img = req.body.img === undefined ? ' ' : req.body.img
	var pos = req.body.pos
	var author = req.body.author

	var log = await blogFacade.addLocationBlog(info, img, pos, author)
	console.log(log)
	res.json(log)
})

/* POST - Like a Blog */
router.post('/blog/like', async function(req, res, next) {
	var userid = req.body.userid
	var blogid = req.body.blogid

	var blog = await blogFacade.likeLocationBlog(blogid, userid)
	res.json(blog)
})

/* Error Handler */
router.get('/error', function(req, res, next) {
	// for demonstration
	if (true) {
		//create error object
		var err = new Error('An Error Occured!')
		// setting a new variable in err
		err.isJson = true
		// can be thrown with --> throw err
		return next(err)
	}
})

module.exports = router
