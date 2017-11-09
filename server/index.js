const express = require('express');
const Promise = require('bluebird');

//Middleware
const bodyParser = require('body-parser');

//Helpers
const db = require('../database/index.js');
const github = require('../helpers/github.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());


app.post('/repos', function (req, res) {
  
  //get repos from api
  github.getReposByUsername(req.body.username)
  .then(repos => {
    return db.save(repos);
  })
  .then(() => {
    res.writeHead(201);
    res.end();
  })
  .catch(error => {
    if (error.message === 'User not found') {
      res.writeHead(404);
      res.end('The specified user was not found');
    } else {
      throw error;
    }
  });
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get()
  .then(repos => {
    console.log(repos);
    res.end();
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

