import React, { ButtonHTMLAttributes } from 'react';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	loading?: boolean;
	colorButton?: TypeColorButton;
}

type TypeColorButton = 'primary' | 'normal';

const Button = (props: IButton) => {
	const { label, disabled, type, form, colorButton, onClick, ...otherProps } = props;

	const buttonColor = (color: TypeColorButton): string => {
		switch (color) {
			case 'primary':
				return 'border-dgray hover:text-dgray hover:bg-dwhite';
			case 'normal':
				return 'border-d';
			default:
				return 'primary';
		}
	};
	return (
		<button
			{...otherProps}
			form={form}
			className={`relative border rounded-md px-2 py-4 inline-block uppercase overflow-hidden transition-all duration-100 hover:delay-100 peer ${buttonColor(
				colorButton ?? 'primary'
			)} ${disabled ? 'bg-slate-400' : ''}`}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{/* <span className="absolute block top-0 -left[100%] w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 peer-hover:left-[100%] peer-hover:transition-all"></span>
			<span className="absolute block"></span> */}
			{label}
		</button>
	);
};

export default Button;
