import React from 'react';

const SearchField = props => {
  return (
    <label>{props.label}
      <input
        name={props.name}
        onChange={props.handlerFunction}
        type='search'
        value={props.value}
        placeholder={props.placeholder}
      />
    </label>
  );
}

export default SearchField;
