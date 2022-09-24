import { IController } from '@/ultils/constants';
import React, { useState, InputHTMLAttributes, ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Label from '@/components/Label';

interface ICheckBox extends InputHTMLAttributes<HTMLInputElement>, IController {
	checked?: boolean;
	name?: string;
	label?: string;
	id?: string;
}

const Checkbox = (props: ICheckBox) => {
	const { checked = false, name, defaultChecked = false, id, onChange: onInputChange } = props;
	const { control } = useForm();

	return (
		<>
			<Label label={name} htmlFor={id} />
			<Controller
				name={name ?? ''}
				control={control}
				render={({ field: { onChange, ref } }) => {
					return (
						<div className="">
							<input
								id={id}
								type="checkbox"
								checked={checked}
								value={checked.toString()}
								onChange={(event: ChangeEvent<HTMLInputElement>) => {
									onInputChange?.(event);
									onChange(!checked);
								}}
								className="cursor-pointer"
								defaultChecked={defaultChecked}
							/>
						</div>
					);
				}}
			/>
		</>
	);
};

export default Checkbox;
