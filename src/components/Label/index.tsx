import { LabelHTMLAttributes } from 'react';

interface ILabel extends LabelHTMLAttributes<HTMLLabelElement> {
	label?: string;
}
const Label = (props: ILabel) => {
	const { htmlFor, form, label, className, ...otherProps } = props;
	return (
		<label {...otherProps} htmlFor={htmlFor} form={form} className={className}>
			{label}
		</label>
	);
};

export default Label;
