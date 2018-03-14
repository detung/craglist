import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
import { faTrashAlt } from '@fortawesome/fontawesome-free-solid';

const TickClimbTile = props => {
  let date = new Date(props.date);
  date = date.toUTCString();
  date = date.split(' ');
  let month = date[2];
  let day = date[1];
  let year = date[3];
  let formattedDate = `${month} ${day}, ${year}`

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
        <FontAwesomeIcon icon={faEdit} onClick={props.clickEdit} />
      </td>
      <td>
        <FontAwesomeIcon icon={faTrashAlt} onClick={props.clickDelete} />
      </td>
    </tr>
  )
}

export default TickClimbTile;
