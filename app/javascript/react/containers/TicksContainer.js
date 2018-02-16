import React from 'react';
import { Link } from 'react-router';
import TickClimbTile from '../components/TickClimbTile';

class TicksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: []
    };
  };

  componentDidMount() {
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
        this.setState({ climbs: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let climbs = this.state.climbs.map(route => {
      return(
        <TickClimbTile
          key={route.climb.id}
          name={route.climb.name}
          location={route.climb.location}
          grade={route.climb.grade}
          discipline={route.climb.discipline}
          pitches={route.climb.pitches}
          comment={route.comment.body}
          date={route.climb.updated_at}
        />
      );
    });

    return(
      <div>
        <div className="row list-container">
          <div className="large-6 column header">
            <h2>Climbs Ticked</h2>
          </div>
          <table className="climb-table tick-table">
            <thead>
              <tr>
                <th>Date Ticked</th>
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

export default TicksContainer;
