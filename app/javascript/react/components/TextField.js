import React from 'react';

const TextField = props => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type='text'
        value={props.value}
      />
    </label>
  );
}

export default TextField;
