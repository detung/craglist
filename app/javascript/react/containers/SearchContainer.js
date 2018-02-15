import React from 'react';
import { Router, browserHistory } from 'react-router';

import Select from '../components/Select';
import SearchField from '../components/SearchField';
import SearchResults from '../components/SearchResults';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      searchResults: [],
      gradeOptions: [
        '5.0',
        '5.1',
        '5.2',
        '5.3',
        '5.4',
        '5.5',
        '5.6',
        '5.7',
        '5.8',
        '5.9',
        '5.10a',
        '5.10b',
        '5.10c',
        '5.10d',
        '5.11a',
        '5.11b',
        '5.11c',
        '5.11d',
        '5.12a',
        '5.12b',
        '5.12c',
        '5.12d',
        '5.13a',
        '5.13b',
        '5.13c',
        '5.13d',
        '5.14a',
        '5.14b',
        '5.14c',
        '5.14d',
        '5.15a',
        '5.15b',
        '5.15c'
      ],
      minGradeSelected: '',
      maxGradeSelected: '',
      typeOptions: ['Boulder', 'Sport', 'Trad'],
      typeSelected: '',
      radiusOptions: [10, 25, 50, 100, 200],
      radiusSelected: ''
    }

    this.handleMinGradeSelection = this.handleMinGradeSelection.bind(this);
    this.handleMaxGradeSelection = this.handleMaxGradeSelection.bind(this);
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
    this.handleRadiusSelection = this.handleRadiusSelection.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  handleMinGradeSelection(event) {
    this.setState({ minGradeSelected: event.target.value })
  }

  handleMaxGradeSelection(event) {
    this.setState({ maxGradeSelected: event.target.value })
  }

  handleRadiusSelection(event) {
    this.setState({ radiusSelected: event.target.value })
  }

  handleSearchChange(event) {
    this.setState({ searchString: event.target.value })
  }

  handleTypeSelection(event) {
    this.setState({ typeSelected: event.target.value })
  }

  submitSearch(event) {
    event.preventDefault()
    let location = this.state.searchString
    let type = this.state.typeSelected
    let radius = this.state.radiusSelected
    let minGrade = this.state.minGradeSelected
    let maxGrade = this.state.maxGradeSelected

    fetch(`api/v1/climbs/search?q=${location}&type=${type}&radius=${radius}&minGrade=${minGrade}&maxGrade=${maxGrade}`, {
      credentials: 'same-origin'
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
      .then(response => response.json())
      .then(body => {
        this.setState({ searchResults: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className="row panel search-form">
        <h3>Search for Popular Climbs by Location</h3>
        <div className="large-3 column">
          <form className="" onSubmit={this.submitSearch}>
            <SearchField
              label="Location"
              name="q"
              placeholder="Ex. Boston, MA"
              value={this.state.searchString}
              handlerFunction={this.handleSearchChange}
            />
            <Select
              label="Distance (miles)"
              options={this.state.radiusOptions}
              selectedOption={this.state.radiusSelected}
              handlerFunction={this.handleRadiusSelection}
            />
            <Select
              label="Type of Climb"
              options={this.state.typeOptions}
              selectedOption={this.state.typeSelected}
              handlerFunction={this.handleTypeSelection}
            />
            <label>Grade Range</label>
            <div className="select-row">
              <div className="select-cell">
                <Select
                  label="Min"
                  options={this.state.gradeOptions}
                  selectedOption={this.state.minGradeSelected}
                  handlerFunction={this.handleMinGradeSelection}
                />
              </div>
              <div className="select-cell">
                <Select
                  label="Max"
                  options={this.state.gradeOptions}
                  selectedOption={this.state.maxGradeSelected}
                  handlerFunction={this.handleMaxGradeSelection}
                />
              </div>
            </div>
            <input className="button" type="submit" value="Search" />
          </form>
        </div>
        <div className="large-9 column">
          <SearchResults
            results={this.state.searchResults}
            router={this.props.router}
          />
        </div>
      </div>
    )
  }
}

export default SearchContainer;
