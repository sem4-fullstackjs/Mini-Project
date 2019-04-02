const mongoose = require('mongoose')
const expect = require('chai').expect
const fetch = require('node-fetch')
var connect = require('../dbConnect.js')

let { testServer } = require('../app')
var User = require('../models/User')

const PORT = 3000
const URL = `http://localhost:${PORT}/api`
let server

describe('Testing the REST API', function() {
	/* Connect to the TEST-DATABASE */
	before(async function() {
		server = await testServer(PORT)
		await connect(require('../settings').TEST_DB_URI)
	})

	after(async function() {
		await mongoose.disconnect()
		server.close()
	})

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
	})

	it('Should get all users - GET', async function() {
		result = await fetch(`${URL}/users`).then(res => res.json())
		expect(result.users.length).to.be.equal(2)
	})

	// it('Should get a user by username - GET', async function() {})

	// it('Should get a user by ID - GET', async function() {})

	// it('Should create a new user - POST', async function() {})

	// it('Should get all locations - GET', async function() {})

	// it('Should get a location by ID - GET', async function() {})

	// it('Should create a new location - POST', async function() {})

	// it('Should like a location - POST', async function() {})

	// it('Should NOT like the same location - POST', async function() {})
})
