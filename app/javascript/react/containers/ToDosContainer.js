import React from 'react';
import { Link } from 'react-router';
import ClimbTile from '../components/ClimbTile';

class ToDosContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: []
    };
  };

  componentDidMount() {
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
      <div>
        <div className="row header">
          <div className="large-6 column">
            <h2>To Do List</h2>
          </div>
          <div className="large-6 column new-button">
            <Link className="button" to="/addclimb">Add a To Do</Link>
          </div>
        </div>
        <div className="row list-container">
          <table className="climb-table">
            <thead>
              <tr>
                <th></th>
                <th>Route Name</th>
                <th>Location</th>
                <th>Grade</th>
                <th>Type</th>
                <th>Pitches</th>
                <th>Comments</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {climbs}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ToDosContainer;
