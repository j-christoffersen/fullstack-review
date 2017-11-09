const Promise = require('bluebird');
const requestAsync = Promise.promisify(require('request'));
const config = require('../config.js');

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  console.log('request sent to:', `https://api.github.com/users/${username}/repos`);
  
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN || config.TOKEN}`
    }
  };
  
  return requestAsync(options)
  .then(value => {
    let responseData = JSON.parse(value.body);
    
    if (responseData.message === 'Not Found') {
      throw new Error('User not found');
    } 
    
    return responseData.map(repo => {
      return {
        name: repo.name,
        ownerName: repo.owner.login,
        url: repo.html_url,
        forksCount: repo.forks_count
      };
    });
  });

}

module.exports.getReposByUsername = getReposByUsername;