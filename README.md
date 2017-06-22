# test

Install:  npm install
Run server: node index.js

Example GET request to search for 'cat' gifs : /api/emojis/search?query=cat

Example POST request to add a new favorite gif : /api/emojis/favorite
BODY
{
 "id" : "randomID",
 "type": 'gifs'
 "meta": {
  "url": "http://someurl.com"
  }
}

