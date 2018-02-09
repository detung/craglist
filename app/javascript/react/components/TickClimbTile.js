import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const TickClimbTile = props => {
  return(
    <tr>
      <td>
      </td>
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
        <FontAwesomeIcon icon={faEdit} />
      </td>
      <td>
        <FontAwesomeIcon icon={faTrashAlt} />
      </td>
    </tr>
  )
}

export default TickClimbTile;
