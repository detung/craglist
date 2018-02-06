import React from 'react';
import { Link } from 'react-router';
import ToDoContainer from './ToDoContainer'

const HomepageContainer = props => {
  return(
    <div className="row">
      <div>
        <Link to='/addclimb'>Add Route</Link>
      </div>
      <div className="large-4 column">
        <ToDoContainer />
      </div>
    </div>
  )
}

export default HomepageContainer;
