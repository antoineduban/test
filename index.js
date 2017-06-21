const express = require('express')
const app = express()

app.get('/api/emojis/search/', function (req, res) {
    res.send(req.query)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
