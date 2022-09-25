import Label from '@/components/Label';
import { IController } from '@/ultils/constants';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface ICheckBox extends InputHTMLAttributes<HTMLInputElement>, IController {
	checked?: boolean;
	name?: string;
	label?: string;
	id?: string;
}

const Checkbox = (props: ICheckBox) => {
	const { checked, name, id, onChange: onInputChange, disabled } = props;
	const { control } = useForm();
	console.log('checked', checked);
	return (
		<>
			<Label htmlFor={id} />
			<Controller
				name={name ?? ''}
				control={control}
				defaultValue={checked}
				render={({ field: { onChange, ref } }) => {
					return (
						<div className="">
							<input
								id={id}
								type="checkbox"
								ref={ref}
								checked={checked}
								value={checked?.toString()}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									if (disabled) return;
									onInputChange?.(event);
									onChange(!checked);
								}}
								className="cursor-pointer border-2"
							/>
						</div>
					);
				}}
			/>
		</>
	);
};

export default Checkbox;
