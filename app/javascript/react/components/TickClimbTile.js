import React from 'react';

const TickClimbTile = props => {
  return(
    <div className="climb-tile">
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

export default TickClimbTile;
