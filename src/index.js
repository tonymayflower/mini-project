const express = require('express')
const app = express()
const db = require('./database/db');
const sql = require('sql-template-strings');
const { v4: uuidv4 } = require('uuid');

app.get('/list', function (req, res) {
    db.query(sql`
    SELECT * FROM users LIMIT 1;
    `)
    .then(({rows}) => {
        console.log(rows)
        return rows;

    })
    .then(res.send.bind(res))
})

app.get('/insert', function (req, res) {
    
    res.send(
      db.query(sql`INSERT INTO users (id, email, password)
      VALUES (${uuidv4()}, 'mich@gmail.com', 'password')
      RETURNING id, email;
    `)
    )
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
