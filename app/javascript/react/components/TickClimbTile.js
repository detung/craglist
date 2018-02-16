import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const TickClimbTile = props => {
  let formattedDate = new Date(props.date);
  let options = { year: "numeric", month: "short", day: "numeric" }
  formattedDate = formattedDate.toLocaleDateString('en-US', options)

  return(
    <tr>
      <td>
        {formattedDate}
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
