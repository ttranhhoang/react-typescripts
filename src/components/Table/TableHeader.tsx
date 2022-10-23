import { COLORS } from '@/ultils/color';
import { IColumnsDefinitionType } from '@/ultils/constants';
import { TYPE_ICONS } from '@/ultils/icons';
import Icon from '../Icon';
import TableRows from './TableRows';

interface ITableHeader {
	columns: Array<IColumnsDefinitionType>;
	data: any[];
	enableSort?: boolean;
	getSortValue?: (key: any) => void;
}
const TableHeader = (props: ITableHeader) => {
	const { columns, data, enableSort, getSortValue } = props;

	const renderHeaders = columns.map((column, index) => (
		<div
			key={index}
			className={`${
				column.groupLabelTools
					? 'text-center py-2.5 flex flex-col'
					: 'text-left py-4 flex justify-start'
			}`}
		>
			<div
				className={`${
					column.groupLabelTools && column.groupLabelTools.length ? 'w-full relative' : ''
				}`}
			>
				<div className={`${column.groupLabelTools ? 'ml-[37%]' : 'flex flex-col items-center'}`}>
					<span className="text-xs font-bold uppercase text-dgray">{column.header}</span>
					{enableSort && !column.groupLabelTools && (
						<span>
							<Icon
								type={TYPE_ICONS.TRIANGLE_DOWN}
								color={COLORS.ORANGE}
								onClick={() => getSortValue && getSortValue(column.key)}
							/>
						</span>
					)}
				</div>
				{column.groupLabelTools && (
					<div className="flex items-center justify-center gap-3 absolute -bottom-[70%] right-[13%]">
						{column.groupLabelTools.map((col, index) => (
							<span
								className={`text-xs font-thin ${
									column.groupLabelTools ? 'border-l-2 pl-2.5 first:border-l-0' : ''
								}`}
								key={index}
							>
								{col}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	));

	return (
		<>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
				}}
			>
				{renderHeaders}
			</div>
			{/* <TableRows columns={columns} data={data} /> */}
		</>
	);
};

export default TableHeader;
