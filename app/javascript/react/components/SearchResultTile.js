import React from 'react';

const SearchResultTile = props => {
  let displayPitch;
  if (props.pitches === 1 || props.pitches === 0 || props.pitches === '') {
    displayPitch = '1 Pitch';
  } else {
    displayPitch = `${props.pitches} Pitches`;
  };

  return(
    <li>
      <div className="row" onClick={props.handleClick}>
        <div className="large-6 column">
          <div className="row search-name">
            {props.name}
          </div>
          <div className="row search-location">
            {props.location.slice(0, 3).reverse().join(', ')}
          </div>
        </div>
        <div className="large-6 column">
          <div className="row search-details">
            <div className="small-4 column">
              {props.grade}
            </div>
            <div className="small-4 column">
              {props.type}
            </div>
            <div className="small-4 column search-pitches">
              {displayPitch}
            </div>
          </div>
          <div className="row search-stars">
            <div className="small-6 column">
              {props.stars} Stars
            </div>
            <div className="small-6 column">
              {props.votes} Votes
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SearchResultTile;
