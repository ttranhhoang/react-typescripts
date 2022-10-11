import { IColumnsDefinitionType, KEY_TOOLS_TABLE } from '@/ultils/constants';
interface ITableRows {
	columns: Array<IColumnsDefinitionType>;
	data: any[];
}
const TableRows = (props: ITableRows) => {
	const { columns, data } = props;
	const renderRowsData = data.map((row, index) => (
		<div
			key={`row-${index}`}
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
				gap: 20,
			}}
			className="border p-2 mb-5 hover:bg-slate-200 hover:font-semibold cursor-pointer"
		>
			{columns.map((column, index2) =>
				column.key === KEY_TOOLS_TABLE.TOOLS ? (
					<div key={`cell-${index2}`} className="flex justify-end items-center gap-5 mr-2">
						{row[column.key].map((e: any, index: number) => (
							<span key={index} className="inline-block">
								{e.icon(row, column)}
							</span>
						))}
					</div>
				) : (
					<div key={`cell-${index2}`} className="truncate text-clip flex">
						{row[column.key]}
					</div>
				)
			)}
		</div>
	));

	return (
		<div className="w-full h-[55vh] overflow-y-auto pr-3 primary-scrollbar">{renderRowsData}</div>
	);
};

export default TableRows;
