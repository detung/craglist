import React from 'react';
import { Link } from 'react-router';

const HomepageContainer = props => {
  return(
    <div className="row">
      <div>
        <Link to='/addclimb'>Add Route</Link>
      </div>
      <div className="large-6 column">
        <Link to='/ticks'>View All Ticks</Link>
      </div>
      <div className="large-6 column">
        <Link to='/todos'>View All To Dos</Link>
      </div>
    </div>
  )
}

export default HomepageContainer;
