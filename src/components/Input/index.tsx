import Icon from '@/components/Icon';
import Label from '@/components/Label';
import { COLORS } from '@/ultils/color';
import { ICON } from '@/ultils/icons';
import { InputHTMLAttributes } from 'react';
import { Control, Controller } from 'react-hook-form';
import { overrideTailwindClasses } from 'tailwind-override';
interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	defaultValue?: string;
	control: Control<any, any>;
	isSearchForm?: boolean;
}
const Input = (props: IInput) => {
	const {
		type,
		control,
		defaultValue,
		name,
		label,
		disabled,
		isSearchForm,
		placeholder,
		className,
		...otherProps
	} = props;
	return (
		<div className={`relative ${overrideTailwindClasses(`mb-5 ${className}`)}`}>
			{isSearchForm ? (
				<div className="">
					<Label htmlFor={name} label={label} className="text-orange" />
					<div className="flex items-center">
						<Icon color={COLORS.ORANGE} width="24" height="30" type={ICON.SEARCH} />
						<Controller
							name={name ?? ''}
							control={control}
							render={({ field: { name, onChange, value, ...otherField } }) => (
								<input
									{...otherField}
									{...otherProps}
									name={name}
									type={type}
									placeholder={placeholder}
									onChange={(e) => onChange(e.target.value)}
									value={value}
									disabled={disabled}
									className="w-full text-orange placeholder:text-orange font-bold rounded-md outline-0 p-3 bg-transparent"
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
