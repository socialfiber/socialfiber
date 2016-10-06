import React from 'react';
import Select from 'react-select';


const SelectComponent = (props) => {

	return (
		<div>
			<Select
				options={props.options}
				{...props.input}
				onBlur={() => {
					props.input.onBlur(props.value)
				}}
			/>
		</div>
	);
	
}

export default SelectComponent;
