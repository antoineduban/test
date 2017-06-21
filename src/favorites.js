var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

module.exports = {
  init: function() {
    db.run('CREATE TABLE favorites (user_id TEXT PRIMARY KEY, gifs TEXT, emojis TEXT)')
  },
  post: function(req, res) {
    if (req.body.type == undefined || req.body.id == undefined || req.body.meta == undefined || req.body.meta.url == undefined)
    {
      res.status(422).send("Incorrect JSON")
      return
    }
    db.serialize(function (){
      let id = req.headers['x-user-token'];
      db.run(`insert or ignore into favorites (user_id, gifs, emojis) values ('${id}', '', '')`)
      db.get(`SELECT ${req.body.type} FROM favorites WHERE user_id='${id}'`, function (err, row) {
        if (err) {
          console.log(err)
          res.status(422).send('')
          return
        }
        let tab = []
        if (req.body.type == "gifs") {
          tab = row.gifs.split(',')
        } else if (req.body.type == "emojis") {
          tab = row.emojis.split(',')
        }
        tab.push(`{"id": "${req.body["id"]}", "url": "${req.body["meta"]["url"]}"}`)
        db.run(`UPDATE favorites SET ${req.body.type}='${tab}' WHERE user_id='${id}'`)
      })
    })
    res.status(204).send('')
  },
  getGifs: function(req, res) {
    db.get(`SELECT * from favorites WHERE user_id ='${req.headers["x-user-token"]}'`, function(err, row) {
      res.setHeader('Content-Type', 'application/json');
      if (row == undefined) {
        res.send("[]")
        return
      }
      res.send("["+row.gifs.substring(1)+"]")
    })
  },
  getEmojis: function(req, res) {
    db.get(`SELECT * from favorites WHERE user_id ='${req.headers["x-user-token"]}'`, function(err, row) {
      res.setHeader('Content-Type', 'application/json');
      if (row == undefined) {
        res.send("[]")
        return
      }
      res.send("["+row.emojis.substring(1)+"]")

    })
  }
}
