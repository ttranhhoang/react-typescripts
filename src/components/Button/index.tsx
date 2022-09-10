import React, { ButtonHTMLAttributes } from 'react';
interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	loading?: boolean;
}

const Button = (props: IButton) => {
	const { label, disabled, type, form, ...otherProps } = props;
	return (
		// <button
		// 	{...otherProps}
		// 	form={form}
		// 	className={`w-full border rounded px-2 py-4 text-lg uppercase transition duration-200 text-white hover:text-opacity-80 relative block overflow-hidden before:bg-red-500 before:top-[50%] before:left-[50%] before:translate-x-52 before:translate-y-52 before:-z-10 before:w-0 before:h-full before:hover:w-full ${
		// 		disabled ? 'bg-slate-400' : ''
		// 	}`}
		// 	type={type}
		// 	disabled={disabled}
		// >
		// 	<span></span>
		// 	<span></span>
		// 	{label}
		// </button>
		<button
			{...otherProps}
			form={form}
			className={`relative border rounded-md px-2 py-4 inline-block uppercase overflow-hidden transition-all duration-500 hover:text-red-400 hover:bg-red-800 hover:delay-100 peer ${
				disabled ? 'bg-slate-400' : ''
			}`}
			type={type}
			disabled={disabled}
		>
			<span className="absolute block top-0 -left[100%] w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 peer-hover:left-[100%] peer-hover:transition-all"></span>
			<span className='absolute block'></span>
			{label}
		</button>
	);
};

export default Button;
