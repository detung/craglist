import React from 'react';
import TextField from '../components/TextField';
import Select from '../components/Select';
import TextArea from '../components/TextArea';

class ClimbFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeName: '',
      location: '',
      gradeOptions: [],
      gradeSelected: '',
      typeOptions: [],
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

  render() {
    return(
      <div>
        Hello from Form Container;
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
        <Select
          label="Grade"
          name="grade"
          options={this.state.gradeOptions}
          selectedOption={this.state.gradeSelected}
          handlerFunction={this.handleGradeSelection}
        />
        <Select
          label="Type"
          name="type"
          options={this.state.typeOptions}
          selectedOption={this.state.typeSelected}
          handlerFunction={this.handleTypeSelection}
        />
        <TextField
          label="Pitches"
          name="pitches"
          value={this.state.pitches}
          handlerFunction={this.handlePitchesChange}
        />
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
        <input className="button" type="submit" value="Submit" />
      </div>
    )
  }
}

export default ClimbFormContainer;
