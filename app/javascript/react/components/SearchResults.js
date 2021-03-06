import React from 'react';
import { Router, browserHistory } from 'react-router';

import SearchResultTile from './SearchResultTile';

class SearchResults extends React.Component {
  constructor(props) {
    super(props)
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
           this.props.router.push('/todos');
           return response;
         } else {
           let errorMessage = `${response.status} (${response.statusText})`,
               error = new Error(errorMessage);
           throw(error);
         }
       })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    };
  }

  render() {
    let results;
    if (this.props.results === 'error') {
      results = 'Could not find any climbs. Try changing your search details.'
    } else {
      results = this.props.results.map(route => {

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
            votes={route.starVotes}
            pitches={route.pitches}
            handleClick={handleClick}
          />
        )
      })
    }

    return(
      <ul className="search-result-list no-bullet">
        {results}
      </ul>
    )
  }
}

export default SearchResults;
