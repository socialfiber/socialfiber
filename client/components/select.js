import React from 'react';
import Select from 'react-select';

const SelectComponent = (props) => {
    return (
    	<Select options={props.options} {...props.input} onBlur={() => {props.input.onBlur(props.value)}} required />
    );
}

export default SelectComponent;