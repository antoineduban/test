const request = require('request')

let emojis = {}

module.exports = {

  init: function() {
    request({
      url:'https://api.github.com/emojis',
      headers: {
        'User-Agent': 'XXX'
      }
    }, (err, res, body) => {
      if (err || res.statusCode != 200) {
        console.log(`Failed to access the emojis API.\nstatusCode: ${res.statusCode}.\nerror: ${err}.\n${body}`);
        return ;
      }
      console.log('Successfully initialized the emojis API');
      emojis = JSON.parse(body);
    })
  },

  query: function (token) {
    res = [];
    for (key in emojis) {
      if (key.includes(token)) {
        res.push({ id:key, url:emojis[key] });
        if (res.length == 20) {
          break ;
        }
      }
    }
    return res;
  }

};
