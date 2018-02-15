import React from 'react';
import { browserHistory } from 'react-router';

import SearchResultTile from './SearchResultTile';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   suggestedClimbs: this.props.results
    // }
  }

  submitSelectedClimb(route) {
    let confirmSelection = confirm(`Add ${route.name}?`);
    let locationFormat = route.location.slice(0, 2).reverse().join(', ');
    let climbPayload = {
      climb: {
        name: route.name,
        location: locationFormat,
        grade: route.rating,
        discipline: route.type,
        pitches: route.pitches
      },
      comment: {
        body: ''
      }
    };

    if (confirmSelection) {
      fetch('/api/v1/climbs', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(climbPayload),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
         if (response.ok) {
           return response;
         } else {
           let errorMessage = `${response.status} (${response.statusText})`,
               error = new Error(errorMessage);
           throw(error);
         }
       })
        // .then(response => response.json())
        // .then(body => {
        //   this.setState({
        //     climbs: body,
        //     showNewForm: false
        //   });
        // })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
      browserHistory.push('/todos');
    };
  }

  render() {
    console.log(this.props.results)
    let results = this.props.results.map(route => {

      let handleClick = () => {
        this.submitSelectedClimb(route)
      }

      return(
        <SearchResultTile
          key={route.id}
          name={route.name}
          location={route.location}
          grade={route.rating}
          type={route.type}
          stars={route.stars}
          pitches={route.pitches}
          handleClick={handleClick}
        />
      )
    })

    return(
      <div>
        {results}
      </div>
    )
  }
}

export default SearchResults;
