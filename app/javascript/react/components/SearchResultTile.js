import React from 'react';

const SearchResultTile = props => {
  return(
    <div className="row search-result-tile" onClick={props.handleClick}>
      <div className="large-6 column">
        <div className="row search-name">
          {props.name}
        </div>
        <div className="row">
          {props.location.slice(0, 3).reverse().join(', ')}
        </div>
      </div>
      <div className="large-6 column">
        <div className="row">
          <span>{props.grade}</span> {props.type} {props.pitches} Pitches
        </div>
        <div className="row">
          {props.stars} Stars
        </div>
      </div>
    </div>
  )
}

export default SearchResultTile;
