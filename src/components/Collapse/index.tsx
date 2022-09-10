import React from 'react';
import Input from '../Input';

interface ICollapsibleFilter {
	label: string;
}
const Collapse = (props: ICollapsibleFilter) => {
	const { label } = props;
	return (
		<div>
			<div>{label}</div>
			{/* <Input type="text" name="firstName" label="First Name" /> */}
		</div>
	);
};

export default Collapse;
