//sql test

var host		= 'localhost',
	port		= 8889,
	user		= 'root',
	password	= 'root',
	database	= 'sem'

var mysql      = require('mysql');

var connection = mysql.createConnection({
  host			: host,
  port			: port,
  user			: user,
  password 		: password,
  database		: database
});

connection.connect();

connection.query('SELECT * FROM users', function(err, rows, fields) {
  if (err) throw err;

  console.log(rows);
});

connection.end();