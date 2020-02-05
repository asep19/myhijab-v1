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
    let sql = "SELECT * FROM pelanggan";
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
    let data = {nama_pelanggan: req.body.nama_pelanggan, email: req.body.email, password: req.body.password};
    let sql = "INSERT INTO pelanggan SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

// edit produk
app.post('/update', (req, res) => {
    let sql = "UPDATE pelanggan SET nama_pelanggan ='"+req.body.nama_pelanggan+"', email='"+req.body.email+"', password='"+ req.body.password+"' WHERE id_pelanggan="+req.body.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        //res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        res.redirect('/');
    });
});

// delete produk
app.post('/delete',(req, res) => {
    let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect('/');
    });
  });

app.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login', failureFlash: true}));

//server
app.listen(3000, () => {
    console.log('server started on port 3000...');
});