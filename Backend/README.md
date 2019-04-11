# Mini-Project
Backend









## Notes

In-order to test the REST API, i had issues starting the server, and having it connect to the right database. However, i managed to find a solution to the problem...

In the app.js i had to make a function that can change the database *app* uses:

```javascript
function setDB(connectstring) {
	var connect = require('./dbConnect')
	connect(require('./settings')[connectstring])
}

app.setDB = setDB
```
Then when i call my testServer, which starts the server and connects to the testDB for `./test/testApi.js` 

```javascript
function testServer(port) {
	return new Promise((resolve, reject) => {
		app.setDB('TEST_DB_URI')
		let server = http.createServer(app)
		server.listen(port, () => {
			resolve(server)
		})
	})
}
```

However, to make sure that *app* also can coonect to the devDB, i had to make some changes in the index file `./bin/www`

```javascript
app.set('port', port)
```


