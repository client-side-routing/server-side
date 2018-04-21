'use strict';
require('dotenv').config();
// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Database Setup
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(express.urlencoded({extended:true}));
//add API and JSON line of code from lecture here

// Application Middleware
app.use(cors());

app.get('/test', (req, res) => res.send('hello world'));

// API Endpoints
app.get('/api/v1/books/:id', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books 
  WHERE title = $1;`)
    [request.body.title]
    .then(results => res.send(results.rows))
    .catch(console.error);
});
app.post('/api/v1/books/:id', (req, res) => {
  client.query(`INSERT INTO books VALUES('${req.body.name}');
  `).then(results => res.send(results.rows))
    .catch(err => res.sendStatus(500));

  //may need to replace name with something relevant to lab

});

app.put('/api/v1/books/:id', (req, res) => {
  //apiURL + id in parenthesis
  client.query(`UPDATE books SET name='${req.body.name}' 
  WHERE id=${req.params.id};
  
  `).then(results => res.send(results.rows))
    .catch(err => res.sendStatus(500));

  //may need to replace name with something relevant to lab

});


app.delete('/api/v1/books/:id', (req, res) => {
  client.query(`
  DELETE FROM books WHERE id=${req.params.id};`)
    .then(results => res.send(results.rows))
    .catch(err => res.sendStatus(500));
});
app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
