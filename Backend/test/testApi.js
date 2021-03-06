const mongoose = require('mongoose')
const expect = require('chai').expect
const fetch = require('node-fetch')
var connect = require('../dbConnect.js')

let { testServer } = require('../app')
var User = require('../models/User')
var LocationBlog = require('../models/LocationBlog')

const PORT = 3000
const URL = `http://localhost:${PORT}/api`
let server

describe('Testing the REST API', function() {
	/* Connect to the TEST-DATABASE */
	before(async function() {
		server = await testServer(PORT)
	})

	after(async function() {
		await mongoose.disconnect()
		server.close()
	})

	beforeEach(async function() {
		this.timeout(5000)
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
				pos: { longitude: 11, latitude: 11 },
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

	it('Should get all users - GET', async function() {
		result = await fetch(`${URL}/users`).then(res => res.json())
		expect(result.users.length).to.be.equal(2)
	})

	it('Should get a user by username - GET', async function() {
		result = await fetch(`${URL}/users/username=kw`).then(res => res.json())
		expect(result.users.firstName).to.be.equal('Kurt')
	})

	it('Should get a user by ID - GET', async function() {
		let user_id = users[1]._id
		result = await fetch(`${URL}/users/id=${user_id}`).then(res => res.json())
		expect(result.users.firstName).to.be.equal('Hanne')
	})

	it('Should get all locations - GET', async function() {
		result = await fetch(`${URL}/blogs`).then(res => res.json())
		expect(result.blogs.length).to.be.equal(2)
	})

	it('Should get a location by ID - GET', async function() {
		let blog_id = blogs[1]._id
		result = await fetch(`${URL}/blogs/id=${blog_id}`).then(res => res.json())
		expect(result.blogs.info).to.be.equal('Test Site-02')
	})

	// it('Should create a new user - POST', async function() {
	//     let newUser = {username: 'Peter', password: 'secret', latitude: 12, longitude: 12, distance: 156}
	// })

	// it('Should create a new location - POST', async function() {})

	// it('Should like a location - POST', async function() {})

	// it('Should NOT like the same location - POST', async function() {})
})
