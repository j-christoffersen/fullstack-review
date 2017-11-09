const mongoose = require('mongoose');
Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  ownerName: String,
  url: String,
  forksCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

//takes array of repos
//returns a promise
let save = (repos) => {
  //string promises together 
  //start with empty immediately resolving promise
  //add .then for each repoInfo in repos
  return repos.reduce((acc, repoInfo) => {
    return acc.then(() => {
      return new Repo(repoInfo).save();
    });
  }, new Promise(resolve => resolve()));
};

let get = () => {
  return Repo.find().sort({forksCount: 1}).limit(25);
};

module.exports.save = save;
module.exports.get = get;