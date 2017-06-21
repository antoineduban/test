const express = require('express')
const app = express()

const gif = require("./src/gif");
const emojis = require('./src/emojis');

const init = function () {
  emojis.init()
}

init()

app.get('/api/emojis/search/', (req, res) => {
  result = emojis.query(req.query.query);
  if (result.length == 0) {
    res.status(204).send("No emojis found");
  } else {
    res.send(result);
  }
})
app.get('/api/gifs/search/', function (req, res) {
    gif.queryGif(req, res)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
