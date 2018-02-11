import React from 'react';
import { browserHistory } from 'react-router';

import TextField from '../components/TextField';
import Select from '../components/Select';
import TextArea from '../components/TextArea';
import NumberField from '../components/NumberField';

class ClimbFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeName: '',
      location: '',
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
      gradeSelected: '',
      typeOptions: ['Boulder', 'Sport', 'Top Rope', 'Trad'],
      typeSelected: '',
      pitches: '',
      description: '',
      comment: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleGradeSelection = this.handleGradeSelection.bind(this);
    this.handleTypeSelection = this.handleTypeSelection.bind(this);
    this.handlePitchesChange = this.handlePitchesChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ routeName: event.target.value })
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value })
  }

  handleGradeSelection(event) {
    this.setState({ gradeSelected: event.target.value })
  }

  handleTypeSelection(event) {
    this.setState({ typeSelected: event.target.value })
  }

  handlePitchesChange(event) {
    this.setState({ pitches: event.target.value })
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value })
  }

  handleCommentChange(event) {
    this.setState({ comment: event.target.value })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      name: this.state.routeName,
      location: this.state.location,
      grade: this.state.gradeSelected,
      discipline: this.state.typeSelected,
      pitches: this.state.pitches,
      description: this.state.description,
      comment: this.state.comment
    };
    this.addNewRoute(formPayload);
    browserHistory.push('/');
  }

  addNewRoute(formPayload) {
    fetch('/api/v1/climbs', {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(formPayload),
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
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div>
        <form className="new-form" onSubmit={this.handleFormSubmit}>
          <TextField
            label="Route Name"
            name="name"
            value={this.state.routeName}
            handlerFunction={this.handleNameChange}
          />
          <TextField
            label="Location"
            name="location"
            value={this.state.location}
            handlerFunction={this.handleLocationChange}
          />
          <div className="select-row">
            <div className="select-cell">
              <Select
                label="Grade"
                options={this.state.gradeOptions}
                selectedOption={this.state.gradeSelected}
                handlerFunction={this.handleGradeSelection}
              />
            </div>
            <div className="select-cell">
              <Select
                label="Type"
                options={this.state.typeOptions}
                selectedOption={this.state.typeSelected}
                handlerFunction={this.handleTypeSelection}
              />
            </div>
            <div className="select-cell" id="pitches">
              <NumberField
                label="Pitches"
                name="pitches"
                value={this.state.pitches}
                handlerFunction={this.handlePitchesChange}
              />
            </div>
          </div>
          <TextArea
            label="Description"
            name="description"
            value={this.state.description}
            handlerFunction={this.handleDescriptionChange}
          />
          <TextArea
            label="Comment"
            name="comment"
            value={this.state.comment}
            handlerFunction={this.handleCommentChange}
          />
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
            <button className="button" onClick={this.props.toggleNewForm}>Cancel</button>
          </div>
        </form>
        <div className="form-sheet"></div>
      </div>
    )
  }
}

export default ClimbFormContainer;
