import { COLORS } from '@/ultils/color';
import { ICON } from '@/ultils/icons';
import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Checkbox from '../Checkbox';
import Icon from '../Icon';
import Input from '../Input';

interface ICollapsibleFilter {
	label?: string;
	name: string;
	isSearchForm?: boolean;
	placeholder?: string;
	defaultCollapse?: boolean;
}
const CollapsibleFilter = (props: ICollapsibleFilter) => {
	const { label, name, isSearchForm, placeholder, defaultCollapse = false } = props;
	const [isOpen, setIsOpen] = useState<boolean>(defaultCollapse);
	const [height, setHeight] = useState<number>(0);
	const ref = useRef<HTMLDivElement>(null);
	const { control } = useForm();
	const dummyData = [
		{
			label: 'label 1',
			value: 'value',
		},
		{
			label: 'label 2',
			value: 'value',
		},
		{
			label: 'label 3',
			value: 'value',
		},
		{
			label: 'label 4',
			value: 'value',
		},
		{
			label: 'label 5',
			value: 'value',
		},
		{
			label: 'label 6',
			value: 'value',
		},
		{
			label: 'label 7',
			value: 'value',
		},
		{
			label: 'label 8',
			value: 'value',
		},
		{
			label: 'label 9',
			value: 'value',
		},
		{
			label: 'label 9',
			value: 'value',
		},
	];
	useEffect(() => {
		ref.current && isOpen ? setHeight(ref?.current?.getBoundingClientRect().height) : setHeight(0);
	}, [isOpen, height]);

	return (
		<div className="w-60 my-5">
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
						{dummyData.map((i, index) => (
							<div key={index} className="flex items-center justify-between  mb-3">
								<div>
									<p className="uppercase">{i.label}</p>
								</div>
								<Checkbox />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CollapsibleFilter;
