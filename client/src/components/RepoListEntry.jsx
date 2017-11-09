import React from 'react';

const RepoListEntry = (props) => (
  <div className="list-entry">
    <a href={props.repo.url}>{props.repo.name}</a>
    Owner: {props.repo.ownerName}
  </div>
)

export default RepoListEntry;