import React from 'react';
import { browserHistory } from 'react-router';

import AddClimbForm from './AddClimbForm';
import SearchContainer from './SearchContainer';

class ClimbFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.addNewClimb = this.addNewClimb.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }

  addNewClimb(formPayloadClimb) {
    this.props.addNewClimb(formPayloadClimb);
  }

  toggleForm(event) {
    event.preventDefault();
    this.props.toggleNewForm(event);
  }

  render() {
    return(
      <div>
        

        <AddClimbForm
          addNewClimb={this.addNewClimb}
          toggleNewForm={this.toggleForm}
        />
      </div>
    )
  }
}

export default ClimbFormContainer;
