var connect = require('./dbConnect.js')
connect(require('./settings').DEV_DB_URI)

var User = require('./models/User.js')
var LocationBlog = require('./models/LocationBlog.js')
var Position = require('./models/Position.js')

function positionCreator(lon, lat, userId, dateInFuture) {
	var posDetail = { user: userId, loc: { coordinates: [lon, lat] } }
	if (dateInFuture) {
		posDetail.created = '2022-09-25T20:40:21.899Z'
	}
	return posDetail
}
async function makeData() {
	console.log('Making users')
	try {
		var userInfos = [
			// Creating Users
			{
				firstName: 'Rylan',
				lastName: 'Miller',
				userName: 'RyMi',
				password: '!C@4vEtv',
				email: 'rylan4@yahoo.com',
				job: [
					{ type: 'Uber Driver', company: 'UBER', companyUrl: 'uber.com' },
					{ type: 'Web Designer', company: 'Microsoft', companyUrl: 'microsoft.com' }
				]
			},
			{
				firstName: 'Jase',
				lastName: 'Johnson',
				userName: 'JaJo',
				password: 'O5d!K9Ka',
				email: 'jase1@yahoo.comk',
				job: [{ type: 'Chef', company: 'McDonalds', companyUrl: 'mcdonalds.com' }]
			},
			{
				firstName: 'Miller',
				lastName: 'Jackson',
				userName: 'MiJack',
				password: '9@(JFppB',
				email: 'mill1@yahoo.com',
				job: [
					{
						type: 'Nurse',
						company: 'Naestved Sygehus',
						companyUrl: 'naestved.sygehus.dk'
					}
				]
			}
		]
		await User.deleteMany({})
		await Position.deleteMany({})
		await LocationBlog.deleteMany({})

		var users = await User.insertMany(userInfos)
		console.log(users)

		var positions = [
			positionCreator(10, 11, users[0]._id),
			positionCreator(11, 12, users[1]._id, true)
		]

		var blogs = [
			{ info: 'Cool Place', pos: { longitude: 26, latitude: 57 }, author: users[0]._id }
		]

		await Position.insertMany(positions)
		await LocationBlog.insertMany(blogs)
	} catch (err) {
		console.log(err)
	}
}
makeData()
