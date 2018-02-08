import React from 'react';
import { Link } from 'react-router';

const HomepageTickList = props => {
  return(
    <div className="large-6 column home-container">
      <div className="row">
        <div className="large-6 column">
          <h3>Tick List</h3>
        </div>
        <div className="large-6 column view-link">
          <Link to='/ticks'>View All Ticks</Link>
        </div>
      </div>
      <ul className="home-list no-bullet">
        {props.ticks}
      </ul>
    </div>
  )
}

export default HomepageTickList;
