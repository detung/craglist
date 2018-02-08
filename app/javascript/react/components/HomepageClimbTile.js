import React from 'react';

const HomepageClimbTile = props => {
  return(
    <li>
      <div className="row">
        <div className="large-6 column name">
          {props.name}
        </div>
        <div className="large-6 column right-column">
          <div className="row location">
            {props.location}
          </div>
          <div className="row grade">
            {props.grade}
            <span className="discipline">{props.discipline}</span>
          </div>
        </div>
      </div>
    </li>
  )
}

export default HomepageClimbTile;
