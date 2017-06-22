var request = require("request");

const apiKey = "d696848d09ec48a78695333b5798950f"

module.exports = {
  queryGif: function(query, res) {
    request("http://api.giphy.com/v1/gifs/search?q="+ query +"&limit=20&api_key=" + apiKey, function(error, response, body) {
      if (error != null) {
        res.status(500).send("Can't access GIPHY's API")
        return
      }
      var info = JSON.parse(body);
      var ret = []
      info["data"].forEach(function(val) {
        ret.push({id: val.id, url: val.url})
      })
      res.status(200).send(ret)
    });
  }
};

