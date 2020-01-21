const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// parse application/json
app.use(bodyParser.json());

// create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myhijab'
});

// connect to database
conn.connect((err) => {
    if(err) throw err;
    console.log('mysql Connected');
})

