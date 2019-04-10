const User = require('../models/User')
const Position = require('../models/position')
const mongoose = require('mongoose')

async function login(userName, password, longitude, latitude, distance) {
	const user = await User.findOne({ userName }).exec()

	if (user === null || user.password != password) {
		return { msg: 'Invalid Username or Password!', status: 403 }
	}

	const coordinates = [longitude, latitude]
	await Position.findOneAndUpdate(
		{ user: user._id },
		{ user, created: Date.now(), loc: { type: 'Point', coordinates } },
		{ upsert: true, new: true }
	).exec()

	const nearbyFriendsPositions = await findNearbyFriends(coordinates, distance)

	return {
		friends: nearbyFriendsPositions.map(friendPos => {
			return {
				username: friendPos.user.userName,
				latitude: friendPos.loc.coordinates[1],
				longitude: friendPos.loc.coordinates[0]
			}
		})
	}
}

async function findNearbyFriends(coordinates, distance) {
	return await Position.find({
		loc: {
			$near: {
				$geometry: { type: 'Point', coordinates },
				$minDistance: 0.01,
				$maxDistance: distance
			}
		}
	})
		.populate('user')
		.exec()
}

module.exports = { login }
