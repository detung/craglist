import React from 'react';
import { Link } from 'react-router';
import HomepageClimbTile from '../components/HomepageClimbTile';
import HomepageToDoList from '../components/HomepageToDoList';
import HomepageTickList from '../components/HomepageTickList';

class HomepageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      tickList: []
    }
  }

  componentDidMount() {
    this.getTickList();
    this.getToDoList();
  }

  getToDoList() {
    fetch('api/v1/climbs/todos', { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
         return response;
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage);
         throw(error);
       }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ toDoList: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  getTickList() {
    fetch('api/v1/climbs/ticks', { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
         return response;
       } else {
         let errorMessage = `${response.status} (${response.statusText})`,
             error = new Error(errorMessage);
         throw(error);
       }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ tickList: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let toDos = this.state.toDoList.map(climb => {
      return(
        <HomepageClimbTile
          key={climb.id}
          name={climb.name}
          grade={climb.grade}
          discipline={climb.discipline}
          location={climb.location}
        />
      )
    });

    let ticks = this.state.tickList.map(climb => {
      return(
        <HomepageClimbTile
          key={climb.id}
          name={climb.name}
          grade={climb.grade}
          discipline={climb.discipline}
          location={climb.location}
        />
      )
    });

    return(
      <div className="row">
        <HomepageTickList
          ticks={ticks}
        />
        <HomepageToDoList
          toDos={toDos}
        />
      </div>
    )
  }
}

export default HomepageContainer;
