const express = require('express')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const app = express()

const gif = require("./src/gif");
const emojis = require('./src/emojis');
const favorites = require('./src/favorites');

const init = function () {
  favorites.init()
  emojis.init()
}

init()

app.get('/api/emojis/search/', (req, res) => {
  result = emojis.query(req.query.query);
  res.send(result);
})

app.get('/api/gifs/search/', function (req, res) {
  gif.queryGif(req.query.query, res)
})

app.post('/api/gifs/favorites/',jsonParser, function (req, res) {
  favorites.post(req, res)
})

app.post('/api/emojis/favorites/',jsonParser, function (req, res) {
  favorites.post(req, res)
})

app.get('/api/gifs/favorites/', function (req, res) {
  favorites.getGifs(req, res)
})

app.get('/api/emojis/favorites/', function (req, res) {
  favorites.getEmojis(req, res)
})

app.listen(3000, function () {
  console.log('GIFS/Emojis test')
})
