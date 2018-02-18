import React from 'react';
import { Link } from 'react-router';

const HomepageTickList = props => {
  return(
    <div className="row home-container">
      <div className="small-5 column">
        <div className="row">
          <div className="small-6 column">
            <h3>Climbs Ticked</h3>
          </div>
          <div className="small-6 column view-link">
            <Link to='/ticks'>View All Ticks</Link>
          </div>
        </div>
        <ul className="home-list no-bullet">
          {props.ticks}
        </ul>
      </div>
    </div>
  )
}

export default HomepageTickList;
