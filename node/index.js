const express = require('express')
const app = express()
const port = 3000

const config = {
	host: 'db_challenge',
	user: 'root',
	password: 'root',
	database: 'nodedb',
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql_insert = `INSERT INTO people(name) VALUES('Robson')`
connection.query(sql_insert)
var results
connection.query("SELECT id, name FROM people", function (err, result, fields) {
	results = result
})

connection.end()

function foo () {
	let str;
	let names = results.map(function(k) {
		return `<p><strong>${k.id}</strong>: ${k.name}</p>`
	})
	return names.join('\n')
}

app.get('/', (req,res) => {
	res.send(
		`<h1>Full Cycle Rocks!</h1>
		<!-- h3>Using docker-compose to launch a dummy application with nodejs + nginx + mysql</h3-->
		<p>${foo()}</p>
		`
	)
})

app.listen(port, () => {
	console.log('Rodando na porta ' + port)
})
