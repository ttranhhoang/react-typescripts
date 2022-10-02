import Icon from '@/components/Icon';
import Label from '@/components/Label';
import { COLORS } from '@/ultils/color';
import { IController } from '@/ultils/constants';
import { ICON } from '@/ultils/icons';
import { InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import { overrideTailwindClasses } from 'tailwind-override';
interface IInput extends InputHTMLAttributes<HTMLInputElement>, IController {
	label?: string;
	defaultValue?: string;
	isSearchForm?: boolean;
	isSearchFormCollpase?: boolean;
	setSearchTextValue?: string;
	typeColor?: TypeColorInput;
}

type TypeColorInput = 'orange' | 'dgray' | 'dwhite';

const Input = (props: IInput) => {
	const {
		type,
		typeColor,
		control,
		defaultValue,
		name,
		label,
		disabled,
		isSearchForm,
		isSearchFormCollpase,
		placeholder,
		className,
		onChange,
		...otherProps
	} = props;

	const colorInput = (color: TypeColorInput) => {
		switch (color) {
			case 'orange':
				return 'text-orange placeholder:text-orange';
			case 'dgray':
				return 'text-dgray placeholder:text-dgray';
			case 'dwhite':
				return 'text-dwhite placeholder:text-dwhite';
			default:
				break;
		}
	};
	return (
		<div className={`relative ${overrideTailwindClasses(`mb-5 ${className}`)}`}>
			{isSearchFormCollpase ? (
				<div
					className={`${
						isSearchForm
							? ''
							: 'border rounded-sm border-gray-300 hover:border-black transition-colors duration-200 '
					}`}
				>
					<Label htmlFor={name} label={label} className={colorInput(typeColor ?? 'orange')} />
					<div className={`flex items-center ${isSearchForm ? '' : 'h-10'}`}>
						<Icon
							color={COLORS.ORANGE}
							width="24"
							height="30"
							type={ICON.SEARCH}
							className={`${isSearchForm ? '' : 'hidden'}`}
						/>
						<Controller
							name={name ?? ''}
							control={control}
							render={({ field: { name, value, ...otherField } }) => (
								<input
									{...otherField}
									{...otherProps}
									name={name}
									type={type}
									placeholder={placeholder}
									onChange={onChange}
									value={value}
									disabled={disabled}
									className={`w-full ${colorInput(
										typeColor ?? 'orange'
									)} font-bold rounded-md outline-0 p-3 bg-transparent`}
								/>
							)}
							defaultValue={defaultValue}
						/>
					</div>
				</div>
			) : (
				<>
					<Controller
						name={name ?? ''}
						control={control}
						render={({ field: { name, onChange, value, ...otherField } }) => (
							<input
								{...otherField}
								{...otherProps}
								id={name}
								name={name}
								type={type}
								placeholder={name}
								onChange={(e) => onChange(e.target.value)}
								value={value}
								disabled={disabled}
								className="w-full border text-white font-bold rounded-md outline-0 p-3 bg-transparent transition-all duration-500 placeholder:text-transparent focus:border-b-teal-400 peer"
							/>
						)}
						defaultValue={defaultValue}
					/>
					<Label
						htmlFor={name}
						label={label}
						className="absolute -top-6 left-0 text-md block text-white peer-placeholder-shown:cursor-text peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-focus:text-sm peer-focus:text-teal-400 peer-focus:absolute peer-focus:block peer-focus:-top-6 peer-focus:left-0 transition-all duration-500"
					/>
				</>
			)}
		</div>
	);
};

export default Input;
