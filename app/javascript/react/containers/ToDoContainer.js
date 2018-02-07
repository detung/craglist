import React from 'react';
import ClimbTile from '../components/ClimbTile';

class ToDoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: []
    };
  };

  componentDidMount() {
    fetch('api/v1/climbs/todo')
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
        this.setState({ climbs: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let climbs = this.state.climbs.map(climb => {
      return(
        <ClimbTile
          key={climb.id}
          name={climb.name}
          location={climb.location}
          grade={climb.grade}
          discipline={climb.discipline}
          pitches={climb.pitches}
          description={climb.description}
          comment={climb.comment}
        />
      );
    });

    return(
      <div className="list-container">
        {climbs}
      </div>
    )
  }
}

export default ToDoContainer;
