import React from 'react';
import { Link } from 'react-router';
import ToDoContainer from './ToDoContainer'

const HomepageContainer = props => {
  return(
    <div className="row">
      <div>
        <Link to='/addclimb'>Add Route</Link>
      </div>
      <div className="large-6 column">
        Ticks
      </div>
      <div className="large-6 column">
        <Link to='/todo'>View All To Dos</Link>
      </div>
    </div>
  )
}

export default HomepageContainer;
