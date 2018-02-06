import React from 'react';

const TextArea = props => {
  return (
    <label>{props.label}
      <textarea
        name={props.name}
        onChange={props.handlerFunction}
        value={props.content}
      />
    </label>
  );
}

export default TextArea;
