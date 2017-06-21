var request = require("request");
var rp = require('request-promise');

const apiKey = "d696848d09ec48a78695333b5798950f"

module.exports = {
  queryGif: function(req, res) {
    request("http://api.giphy.com/v1/gifs/search?q="+ req.query.query +"&limit=20&api_key=" + apiKey, function(error, response, body) {
      if (error != null) {
        res.status(500).send(error)
        return
      }
      var info = JSON.parse(body);
      var ret = []
      info["data"].forEach(function(val) {
        ret.push({id: val.id, url: val.url})
      })
      if (ret.length != 0) {
        res.status(200)
        res.send(ret)
      } else {
        res.status(204).send("No gifs found.")
      }
    });
  }
};

