import React from 'react';
import Select from 'react-select';

const GenderSelect = (props) => {

  return (
    <div className='selectComponent-div'a>
      <Select
        options={[{value: 'male', label: 'male'}, {value: 'female', label: 'female'}]}
        {...props.input}
        onBlur={() => {
          props.input.onBlur(props.value);
          props.genderState.setState({gender: props.input.value.value});
        }}
        className="selectComponent-div"
      />
    </div>
  );
}

export default GenderSelect;
