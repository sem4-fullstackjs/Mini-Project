const mongoose = require('mongoose')
const expect = require('chai').expect
let connect = require('../dbConnect.js')

let blogFacade = require('../facades/blogFacade')
let userFacade = require('../facades/userFacade')
let LocationBlog = require('../models/LocationBlog')

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
		await LocationBlog.deleteMany({})
		users = await userFacade.getAllUsers()
		blogs = await LocationBlog.insertMany([
			{
				info: 'CPH-Business Lyngby',
				pos: { longitude: 12.511, latitude: 55.77 },
				author: users[0]._id
			},
			{
				info: 'Test Site',
				pos: { longitude: 32.3329, latitude: 27.939 },
				author: users[1]._id,
				likedBy: users[0]._id
			}
		])
	})

	it('Should Find all Location Blogs', async function() {
		var blogs = await blogFacade.getAllLocationBlogs()
		expect(blogs.length).to.be.equal(2)
	})

	it('Should Add Burger King', async function() {
		var blog = await blogFacade.addLocationBlog(
			'Burger King',
			'Test img string',
			12.345,
			56.789,
			users[0]._id
		)
		expect(blog).to.not.be.null
		expect(blog.info).to.be.equal('Burger King')
		var blogs = await blogFacade.getAllLocationBlogs()
		expect(blogs.length).to.be.equal(3)
	})

	it('Should Find CPH-Business Lyngby by Info', async function() {
		var blog = await blogFacade.findByInfo('CPH-Business Lyngby')
		expect(blog.info).to.be.equal('CPH-Business Lyngby')
	})

	it('Should Find CPH-Business Lyngby by ID', async function() {
		var blog = await blogFacade.findById(blogs[0]._id)
		expect(blog.info).to.be.equal('CPH-Business Lyngby')
	})

	it('Should Add a Like to CPH Business Lyngby', async function() {
		var blog = await blogFacade.likeLocationBlog(users[0]._id, blogs[0]._id)
		expect(blog.likedByCount).to.be.equal(1)
	})

	it('Should NOT add a like to Test Site - User has already liked', async function() {
		var blog = await blogFacade.likeLocationBlog(users[0]._id, blogs[1]._id)
		expect(blog.likedByCount).to.be.equal(1)
	})
})
