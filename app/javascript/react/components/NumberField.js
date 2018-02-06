import React from 'react';

const NumberField = props => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type='number'
        value={props.value}
        min="1"
      />
    </label>
  );
}

export default NumberField;
