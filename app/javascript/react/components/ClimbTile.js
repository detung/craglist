import React from 'react';

const ClimbTile = props => {
  return(
    <tr>
      <td></td>
      <td>
        {props.name}
      </td>
      <td>
        {props.location}
      </td>
      <td>
        {props.grade}
      </td>
      <td>
        {props.discipline}
      </td>
      <td>
        {props.pitches}
      </td>
      <td>
        {props.comment}
      </td>
      <td>
        Edit Delete
      </td>
    </tr>
  )
}

export default ClimbTile;
