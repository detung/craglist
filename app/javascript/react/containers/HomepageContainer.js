import React from 'react';
import ToDoContainer from './ToDoContainer'

const HomepageContainer = props => {
  return(
    <div className="row">
      <div className="large-4 column">
        <ToDoContainer />
      </div>
    </div>
  )
}

export default HomepageContainer;
