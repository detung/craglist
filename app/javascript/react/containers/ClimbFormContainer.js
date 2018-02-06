import React from 'react';

class ClimbFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div>
        Hello from Form Container;
        <input className="button" type="submit" value="Submit" />
      </div>
    )
  }
}

export default ClimbFormContainer;
