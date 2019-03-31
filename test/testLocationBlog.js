const mongoose = require('mongoose')
const expect = require('chai').expect
let connect = require('../dbConnect.js')

var blogFacade = require('../facades/blogFacade')
var LocationBlog = require('../models/LocationBlog')
var User = require('../models/User')

describe('Testing the LocationBlog Facade', function() {
	/* Connect to the TEST-DATABASE */
	before(async function() {
		this.timeout(require('../settings').MOCHA_TEST_TIMEOUT)
		await connect(require('../settings').TEST_DB_URI)
	})

	after(async function() {
		await mongoose.disconnect()
	})

	/* Setup the database in a known state (2 blogs, and 2 users) BEFORE EACH test */
	beforeEach(async function() {
		await User.deleteMany({})
		users = await User.insertMany([
			{
				firstName: 'Kurt',
				lastName: 'Wonnegut',
				userName: 'kw',
				password: 'test',
				email: 'a@b.dk'
			},
			{
				firstName: 'Hanne',
				lastName: 'Wonnegut',
				userName: 'hw',
				password: 'test',
				email: 'b@b.dk'
			}
		])

		await LocationBlog.deleteMany({})
		blogs = await LocationBlog.insertMany([
			{
				info: 'Test Site-01',
				pos: { longitude: 12, latitude: 14 },
				author: users[0]._id
			},
			{
				info: 'Test Site-02',
				pos: { longitude: 16, latitude: 18 },
				author: users[1]._id,
				likedBy: users[0]._id
			}
		])
	})

	it('Should Find All LocationBlogs', async function() {
		var blogs = await blogFacade.getAllLocationBlogs()
		expect(blogs.length).to.be.equal(2)
	})

	it('Should Add Test Site-03', async function() {
		var blog = await blogFacade.addLocationBlog(
			'Test Site-03',
			'img.png',
			{ longitude: 13, latitude: 13 },
			users[0]._id
		)
		expect(blog).to.not.be.null
		expect(blog.info).to.be.equal('Test Site-03')
		var blogs = await blogFacade.getAllLocationBlogs()
		expect(blogs.length).to.be.equal(3)
	})

	it('Should Find Test Site-01 by Info', async function() {
		var blog = await blogFacade.findByInfo('Test Site-01')
		expect(blog.info).to.be.equal('Test Site-01')
	})

	it('Should Find Test Site-01 by ID', async function() {
		var blog = await blogFacade.findById(blogs[0]._id)
		expect(blog.info).to.be.equal('Test Site-01')
	})

	it('Should Add a Like to Test Site-01', async function() {
		var blog = await blogFacade.likeLocationBlog(users[0]._id, blogs[0]._id)
		expect(blog.likedByCount).to.be.equal(1)
	})

	it('Should NOT Add a Like to Test Site-02', async function() {
		var blog = await blogFacade.likeLocationBlog(users[0]._id, blogs[1]._id)
		expect(blog.likedByCount).to.be.equal(1)
	})
})
