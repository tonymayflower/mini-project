const express = require('express')
const app = express()
const {consume} = require('./src/consumer')

app.get('/', (req, res) => res.sendStatus(200));
app.get('/health', (req, res) => res.sendStatus(200));

app.use(express.json());


app.listen(8080, function () {
    consume()  
    console.log('worker listening on port 8080!')
})
