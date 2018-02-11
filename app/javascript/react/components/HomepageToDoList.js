import React from 'react';
import { Link } from 'react-router';

const HomepageToDoList = props => {
  return(
    <div className="large-6 column home-container">
      <div className="row">
        <div className="large-6 column">
          <h3>Climbs To Do</h3>
        </div>
        <div className="large-6 column view-link">
          <Link to='/todos'>View All To-Dos</Link>
        </div>
      </div>
      <ul className="home-list no-bullet">
        {props.toDos}
      </ul>
    </div>
  )
}

export default HomepageToDoList;
