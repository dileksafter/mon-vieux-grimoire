const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('hello express server')
})

app.listen(port,() => {
    console.log(`server running on http://localhost:${port}`)
})

module.exports = app;