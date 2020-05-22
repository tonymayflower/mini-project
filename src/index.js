const express = require('express')
const app = express()
const api = require('./api');

app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.json());

app.use(api);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
