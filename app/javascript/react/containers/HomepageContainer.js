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
    fetch('api/v1/climbs/home_todos', { credentials: 'same-origin' })
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
    fetch('api/v1/climbs/home_ticks', { credentials: 'same-origin' })
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
    let toDos = this.state.toDoList.map(route => {
      return(
        <HomepageClimbTile
          key={route.climb.id}
          name={route.climb.name}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          location={route.climb.location}
        />
      )
    });

    let ticks = this.state.tickList.map(route => {
      return(
        <HomepageClimbTile
          key={route.climb.id}
          name={route.climb.name}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          location={route.climb.location}
        />
      )
    });

    return(
      <div className="row">
        <div className="small-10 small-offset-1 medium-6 medium-offset-3 large-6 column">
          <HomepageTickList
            ticks={ticks}
          />
        </div>
        <div className="small-10 small-offset-1 medium-6 medium-offset-3 large-6 end column">
          <HomepageToDoList
            toDos={toDos}
          />
        </div>
      </div>
    )
  }
}

export default HomepageContainer;
