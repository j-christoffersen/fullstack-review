import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.fetch();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        username: term
      }),
      success: function(data) {
        this.fetch();
      }.bind(this),
      error: function(data) {}
    })
  }
  
  fetch() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        this.setState({
          repos: data
        });
      }.bind(this),
      error: function(error, string, other) {
        // console.log('there was an error');
        // console.log(error);
        // console.log(string);
        // console.log(other);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));