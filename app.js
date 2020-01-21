const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const hbs = require('hbs');

const app = express();

// create database connection and connect to database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myhijab'
});
conn.connect((err) => {
    if(err) throw err;
    console.log('mysql Connected');
});

app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/assets', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views')); // set views file
app.set('view engine', 'hbs');

// route untuk homepage
app.get('/', (req, res) => {
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('product_view', {
            results: results
        });
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// tambah data
app.post('/save', (req, res) => {
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// edit produk
app.put('/api/products/:id', (req, res) => {
    let sql = "UPDATE product SET product_name ='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// delete produk
app.delete('/delete', (req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//server
app.listen(3000, () => {
    console.log('server started on port 3000...');
});