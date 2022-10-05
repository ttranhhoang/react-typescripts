import { IColumnsDefinitionType } from '@/ultils/constants';
import TableRows from './TableRows';

interface ITableHeader {
	columns: Array<IColumnsDefinitionType>;
	data: any[];
}
const TableHeader = (props: ITableHeader) => {
	const { columns, data } = props;
	const renderHeaders = columns.map((column, index) => (
		<div
			key={index}
			className={`w-full ${column.groupLabelTools ? 'text-center py-2.5' : 'text-left py-5'}`}
		>
			<div
				className={`${
					column.groupLabelTools && column.groupLabelTools.length === 2
						? 'w-2/3 mx-auto relative '
						: ''
				}`}
			>
				<div className={`${column.groupLabelTools ? 'ml-5 block' : ''}`}>{column.header}</div>
				{column.groupLabelTools ? (
					<div className="flex items-center justify-center gap-2 absolute -bottom-[70%] left-[40%]">
						{column.groupLabelTools.map((col, index) => (
							<span
								className={`text-sm font-thin ${
									column.groupLabelTools && column.groupLabelTools.length - 1 === index
										? ''
										: 'pr-2 border-r-2'
								}`}
								key={index}
							>
								{col}
							</span>
						))}
					</div>
				) : (
					<></>
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
			<TableRows columns={columns} data={data} />
		</>
	);
};

export default TableHeader;
