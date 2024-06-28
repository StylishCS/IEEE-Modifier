const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "IEEE Modifier Test2",
});

exports.conn = conn;
