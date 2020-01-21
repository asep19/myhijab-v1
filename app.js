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

// tampilkan semua data produk
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM products";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    })
})

// tampilkan data produk berdasarkan id 
app.get('/api/products/:id', (req, res) => {
    let sql = "SELECT * FROM products WHERE products_id = "+req.params.id;
    let query = conn.query(sql, (req, res) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "responses": results}));
    })
})