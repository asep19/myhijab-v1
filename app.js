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
});

// tampilkan semua data produk
app.get('/api/products', (req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// tampilkan data produk berdasarkan id 
app.get('/api/products/:id', (req, res) => {
    let sql = "SELECT * FROM product WHERE product_id = "+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
}); 

// tambah produk
app.post('/api/products', (req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//server
app.listen(3000, () => {
    console.log('server started on port 3000...');
});