import React from 'react';
import { Link } from 'react-router';

const HomepageToDoList = props => {
  return(
    <div className="row home-container">
      <div className="small-5 column">
        <div className="row">
          <div className="small-6 column">
            <h3>Climbs To Do</h3>
          </div>
          <div className="small-6 column view-link">
            <Link to='/todos'>View All To-Dos</Link>
          </div>
        </div>
        <ul className="home-list no-bullet">
          {props.toDos}
        </ul>
      </div>
    </div>
  )
}

export default HomepageToDoList;
