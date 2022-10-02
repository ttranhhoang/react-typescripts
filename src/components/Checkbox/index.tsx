import Label from '@/components/Label';
import { IController } from '@/ultils/constants';
import { ICON } from '@/ultils/icons';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import Icon from '../Icon';

interface ICheckBox extends InputHTMLAttributes<HTMLInputElement>, IController {
	checked: boolean;
	name?: string;
	label?: string;
	id?: string;
}

const Checkbox = (props: ICheckBox) => {
	const { checked = false, name, id, onChange: onInputChange, disabled, control } = props;
	return (
		<>
			<Label htmlFor={id} />
			<Controller
				name={name ?? ''}
				control={control}
				defaultValue={checked}
				render={({ field: { onChange, ref } }) => {
					return (
						<div className="relative w-6 h-6">
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
								className="cursor-pointer appearance-none"
							/>
							<span className="border border-gray-300 rounded-sm inline-block absolute w-full h-full inset-0 hover:border-secondary transition-all ease-linear duration-150">
								<Icon type={ICON.CHECKED} className={`${checked ? 'visible' : 'invisible'} `} />
							</span>
						</div>
					);
				}}
			/>
		</>
	);
};

export default Checkbox;
