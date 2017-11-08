const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  ownerName: String,
  url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (...repos) => {
  //string promises together
  repos.forEach(repoInfo => {
    new Repo(repoInfo).save();
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;