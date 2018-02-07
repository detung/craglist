import React from 'react';
import { Link } from 'react-router'
import ClimbTile from '../components/ClimbTile';

class TicksContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      climbs: []
    };
  };

  componentDidMount() {

  }

  render() {
    return(
      <div>hello from tick container</div>
    )
  }
}

export default TicksContainer;
