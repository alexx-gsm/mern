import React from 'react';
import classnames from 'classname';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  handleInput,
  label,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group row  ">
      <label className="col-sm-2 col-form-label">{label}</label>
      <div class="col-sm-10">
        <select
          className={classnames('form-control ', {
            'is-invalid': error
          })}
          name={name}
          value={value}
          onChange={handleInput}
        >
          {selectOptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  handleInput: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
