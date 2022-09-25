// import { COLORS } from '@/ultils/color';
// import { ICON } from '@/ultils/icons';
// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Checkbox from '../Checkbox';
// import Icon from '../Icon';
// import Input from '../Input';

// interface ICollapsibleFilter {
// 	label?: string;
// 	name: string;
// 	isSearchForm?: boolean;
// 	placeholder?: string;
// 	defaultCollapse?: boolean;
// }
// const CollapsibleFilter = (props: ICollapsibleFilter) => {
// 	const { label, name, isSearchForm, placeholder, defaultCollapse = false } = props;
// 	const ref = useRef<HTMLDivElement>(null);
// 	const [isOpen, setIsOpen] = useState<boolean>(defaultCollapse);
// 	const [height, setHeight] = useState<number>(0);
// 	const [checked, setChecked] = useState<boolean>(false);
// 	const { control } = useForm();

// 	return (
// 		<div className="w-60 my-5">
// 			<div
// 				className="flex justify-between rounded-br-2xl bg-dgray relative cursor-pointer py-1.5 px-2.5"
// 				onClick={() => setIsOpen(!isOpen)}
// 			>
// 				<p className="text-dwhite uppercase">{label}</p>
// 				<span
// 					className={`absolute -bottom-[25%] right-[5%] rounded-full bg-dwhite z-10 cursor-pointer drop-shadow-md transition-transform ease-in duration-300 ${
// 						isOpen ? '-rotate-180' : 'rotate-0'
// 					}`}
// 				>
// 					<Icon type={ICON.CHEVRON} height="24" width="24" color={COLORS.GRAY} />
// 				</span>
// 			</div>

// 			<div
// 				className={'w-full overflow-hidden transition-all linear duration-300'}
// 				style={{ height }}
// 			>
// 				<div ref={ref}>
// 					<Input
// 						type="text"
// 						name={name}
// 						control={control}
// 						className="mb-1"
// 						placeholder={placeholder}
// 						isSearchForm={isSearchForm}
// 					/>

// 					<div className={'w-full max-h-52 overflow-y-auto px-3'}>
// 						{dummyData.map((i, index) => (
// 							<div key={index} className="flex items-center justify-between  mb-3">
// 								<div>
// 									<p className="uppercase">{i.label}</p>
// 								</div>
// 								<Checkbox checked={checked} />
// 							</div>
// 						))}
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CollapsibleFilter;
import { EMPTY_GUID, IOption } from '@/ultils/constants';
import { COLORS } from '@/ultils/color';
import { ICON } from '@/ultils/icons';
import Input from '../Input';
import React, {
	HTMLAttributes,
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { overrideTailwindClasses } from 'tailwind-override';
import Checkbox from '../Checkbox';
import Icon from '../Icon';

type ITypeScrollbar = 'primary' | 'secondary' | 'primary-rounded' | 'secondary-rounded';

export const OPTION_GUID_ALL = {
	label: 'All',
	value: '000000000000',
};

interface IFilterOptionProps {
	option: IOption;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	checked?: boolean;
	disabled?: boolean;
	isRadioButton?: boolean;
}
const FilterOption = ({
	option,
	onChange,
	checked = false,
	disabled = false,
}: IFilterOptionProps) => {
	const { control } = useForm();
	const refOption = useRef<HTMLDivElement>(null);
	return (
		<>
			<div
				data-tip
				data-for={`filter-option-${option.label}`}
				onClick={(event: any) => !disabled && onChange(event)}
				className={`flex flex-row w-full items-center justify-between py-2 px-3 my-1 relative truncate ${
					!disabled ? 'hover:bg-slate-400 cursor-pointer' : ''
				}`}
			>
				<div ref={refOption} className={`truncate text-sm w-4/5 ${disabled ? 'text-dgray' : ''}`}>
					{option.label.toUpperCase()}
				</div>

				<Checkbox
					type="sm"
					control={control}
					name="FilterOption"
					className="my-0 absolute right-1 top-0 p-2"
					checked={checked}
					id={option.value}
					disabled={disabled}
				/>
			</div>
		</>
	);
};

interface ICollapsibleFilter extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	options?: IOption[];
	defaultCollapsed?: boolean;
	onSelectOptions: (options: IOption[]) => void;
	titleBackgroundColor?: string;
	searchEnabled?: boolean;
	typeScrollbar?: ITypeScrollbar;
	disabled?: boolean;
	defaultValues?: string[];
	isReset?: boolean;
	isRadioButton?: boolean;
	defaultValuesRadio?: IOption;
	label?: string;
	name?: string;
	isSearchForm?: boolean;
	placeholder?: string;
	defaultCollapse?: boolean;
}

const Collapse = (props: ICollapsibleFilter) => {
	const {
		title,
		options,
		className,
		defaultCollapsed = false,
		onSelectOptions,
		titleBackgroundColor,
		searchEnabled = true,
		typeScrollbar = 'primary',
		disabled,
		defaultValues,
		isReset,
		isRadioButton,
		defaultValuesRadio,
		label,
		placeholder,
		name,
		isSearchForm,
		...otherProps
	} = props;
	const [searchText, setSearchText] = useState<string>('');
	const [selectedOptions, setSelectedOptions] = useState<IOption[]>([OPTION_GUID_ALL]);
	const [isOpen, setIsOpen] = useState<boolean>(defaultCollapsed);
	const [height, setHeight] = useState<number>(0);
	const { control } = useForm();
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		handleSetDefaultValueTypeCheckbox();
	}, [JSON.stringify(defaultValues), options?.length]);

	useEffect(() => {
		ref.current && isOpen ? setHeight(ref?.current?.getBoundingClientRect().height) : setHeight(0);
	}, [isOpen, height]);

	useEffect(() => {
		if (isRadioButton) {
			defaultValuesRadio && setSelectedOptions([defaultValuesRadio]);
		} else if (isReset) {
			handleSetDefaultValueTypeCheckbox();
		}
	}, [isReset, defaultValuesRadio]);

	const handleSetDefaultValueTypeCheckbox = () => {
		if (!isRadioButton && defaultValues && defaultValues.length > 0) {
			if (defaultValues.length === options?.length || defaultValues.includes(EMPTY_GUID)) {
				setSelectedOptions([OPTION_GUID_ALL]);
			} else {
				setSelectedOptions(
					options ? options.filter((opt) => defaultValues?.includes(opt?.value)) : []
				);
			}
		}
	};

	const handleSearch = (event: any) => {
		setSearchText(event.target.value.trim());
	};

	// const handleSelect = useCallback(
	// 	(option: IOption) => {
	// 		let selectedOption = [...selectedOptions];
	// 		if (isRadioButton) {
	// 			onSelectOptions([option]);
	// 			setSelectedOptions([option]);
	// 		} else {
	// 			if (option.value !== OPTION_GUID_ALL.value) {
	// 				selectedOption.find((e) => e.value === option.value)
	// 					? (selectedOption = selectedOption.filter((e) => e.value !== option.value))
	// 					: selectedOption.push(option);
	// 				selectedOption.filter((e) => e.value !== OPTION_GUID_ALL.value).length === options?.length
	// 					? selectedOption.push(OPTION_GUID_ALL)
	// 					: (selectedOption = selectedOption.filter((e) => e.value !== OPTION_GUID_ALL.value));
	// 				onSelectOptions(selectedOption);
	// 			} else {
	// 				if (selectedOption.find((e) => e.value === OPTION_GUID_ALL.value)) {
	// 					selectedOption = [];
	// 					onSelectOptions([]);
	// 				} else {
	// 					if (searchText.trim()) {
	// 						const optionFiltered = options?.filter((o) =>
	// 							o.label.toLowerCase().includes(searchText.toLowerCase())
	// 						);
	// 						selectedOption = [...(optionFiltered ?? []), OPTION_GUID_ALL];
	// 						onSelectOptions(optionFiltered ?? []);
	// 					} else {
	// 						selectedOption = [...(options ?? []), OPTION_GUID_ALL];
	// 						onSelectOptions([
	// 							{
	// 								label: OPTION_GUID_ALL.label,
	// 								value: OPTION_GUID_ALL.value,
	// 							},
	// 						]);
	// 					}
	// 				}
	// 			}
	// 			setSelectedOptions(selectedOption);
	// 		}
	// 	},
	// 	[selectedOptions]
	// );
	const handleSelect = (option: IOption) => {
		let selected = [...selectedOptions];
		if (option.value !== OPTION_GUID_ALL.value) {
			const check = selected.find((e) => e.value === option.value)
				? (selected = selected.filter((e) => e.value !== option.value))
				: selected.push(option);
			selected.filter((e) => e.value !== OPTION_GUID_ALL.value).length === options?.length
				? selected.push(OPTION_GUID_ALL)
				: (selected = selected.filter((e) => e.value !== OPTION_GUID_ALL.value));
			onSelectOptions(selected);
		}
	};

	const checkTypeScrollbar = useCallback((type: ITypeScrollbar): string => {
		switch (type) {
			case 'secondary':
				return 'secondary-scrollbar';
			case 'primary-rounded':
				return 'primary-scrollbar-rounded';
			case 'secondary-rounded':
				return 'secondary-scrollbar-rounded';
			default:
				return 'primary-scrollbar';
		}
	}, []);

	// const Header = useMemo(
	// 	() => (
	// 		<HeaderTable
	// 			style={{ backgroundColor: titleBackgroundColor }}
	// 			label={title}
	// 			textSize="sm"
	// 			icon={
	// 				<Icon
	// 					type={ICON_TYPES.CHEVRON_DOWN}
	// 					color={DGRAY_COLOR}
	// 					width={30}
	// 					height={30}
	// 					className={`transform transition-all duration-200 ${
	// 						isCollapsed ? 'rotate-180' : 'rotate-0'
	// 					}`}
	// 				/>
	// 			}
	// 		/>
	// 	),
	// 	[isCollapsed]
	// );

	return (
		<div {...otherProps} className={overrideTailwindClasses(`w-60 ${className}`)}>
			<div className="w-60 my-5">
				{' '}
				<div
					className="flex justify-between rounded-br-2xl bg-dgray relative cursor-pointer py-1.5 px-2.5"
					onClick={() => setIsOpen(!isOpen)}
				>
					<p className="text-dwhite uppercase">{label}</p>
					<span
						className={`absolute -bottom-[25%] right-[5%] rounded-full bg-dwhite z-10 cursor-pointer drop-shadow-md transition-transform ease-in duration-300 ${
							isOpen ? '-rotate-180' : 'rotate-0'
						}`}
					>
						<Icon type={ICON.CHEVRON} height="24" width="24" color={COLORS.GRAY} />
					</span>
				</div>
				<div
					className={'w-full overflow-hidden transition-all linear duration-300'}
					style={{ height }}
				>
					<div ref={ref}>
						<Input
							type="text"
							name={name}
							control={control}
							className="mb-1"
							placeholder={placeholder}
							isSearchForm={isSearchForm}
						/>

						<div className={'w-full max-h-52 overflow-y-auto px-3'}>
							<FilterOption
								key={0}
								option={OPTION_GUID_ALL}
								onChange={() => handleSelect(OPTION_GUID_ALL)}
								checked={
									!!selectedOptions.find((opt: IOption) => opt.value === OPTION_GUID_ALL.value)
								}
								disabled={disabled}
							/>
							{options &&
								options
									.filter((o) => o.label.toLowerCase().includes(searchText.toLowerCase()))
									.map((option, i) => (
										<FilterOption
											key={i}
											option={option}
											onChange={() => {
												handleSelect(option);
												console.log('opt', option);
												console.log(
													'!!checked',
													!!selectedOptions.find((o) => o.value === option.value)
												);
											}}
											checked={!!selectedOptions.find((o) => o.value === option.value)}
											disabled={disabled}
										/>
									))}
						</div>
					</div>
				</div>
			</div>

			{/* <div>
				<FilterOption
					key={0}
					option={OPTION_GUID_ALL}
					onChange={() => handleSelect(OPTION_GUID_ALL)}
					checked={!!selectedOptions.find((o: IOption) => OPTION_GUID_ALL.value === o.value)}
					disabled={disabled}
				/>
				{options &&
					options
						.filter((o) => o.label.toLowerCase().includes(searchText.toLowerCase()))
						.map((option, i) => (
							<FilterOption
								key={i}
								option={option}
								onChange={() => handleSelect(option)}
								checked={!!selectedOptions.find((o) => o.value === option.value)}
								disabled={disabled}
							/>
						))}
			</div> */}
		</div>
	);
};

export default memo(Collapse);
