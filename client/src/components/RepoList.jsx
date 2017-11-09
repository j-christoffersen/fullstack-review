import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <div>
      {props.repos.map((repo, i) => <RepoListEntry repo={repo} key={i}/>)}
    </div>
  </div>
)

export default RepoList;