//https://docs.expo.io/versions/latest/sdk/map-view/

import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import { Constants, Location, Permissions, MapView, Marker } from 'expo'

const mapStyle = require('./mapStyle')

export default class App extends Component {
	state = {
		location: null,
		errorMessage: null
	}

	componentWillMount() {
		this._getLocationAsync()
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			})
		}

		let location = await Location.getCurrentPositionAsync({})
		const { latitude, longitude } = location.coords
		const address = await Location.reverseGeocodeAsync({ latitude, longitude })
		this.setState({ location, address })
	}

	render() {
		let text = 'Waiting..'
		let loc = null
		if (this.state.errorMessage) {
			text = this.state.errorMessage
		} else if (this.state.location) {
			loc = { latitude, longitude } = this.state.location.coords
			text = `Latitude: ${loc.latitude.toFixed(6)} \n Longitude: ${loc.longitude.toFixed(6)}`
			loc_test = { latitude: 55.377169, longitude: 11.967019 }
		}

		return (
			<View style={styles.container}>
				{/* This is to display the coords over the map*/}
				<Text style={styles.paragraph}>{text}</Text>
				{this.state.location && (
					<MapView
						provider={MapView.PROVIDER_GOOGLE}
						customMapStyle={mapStyle}
						style={{ flex: 1 }}
						initialRegion={{
							latitude: this.state.location.coords.latitude,
							longitude: this.state.location.coords.longitude,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421
						}}
					>
						<MapView.Marker title="You" coordinate={loc} />
						{/* This test_marker is located in Terslev */}
						<MapView.Marker title="Test" coordinate={loc_test} />
					</MapView>
				)}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
		backgroundColor: '#ecf0f1'
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		textAlign: 'center'
	}
})
