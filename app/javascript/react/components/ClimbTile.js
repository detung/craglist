import React from 'react';

const ClimbTile = props => {
  return(
    <div>
      {props.name}
      {props.location}
      {props.grade}
      {props.discipline}
      {props.pitches}
      {props.description}
      {props.comment}
    </div>
  )
}

export default ClimbTile;
