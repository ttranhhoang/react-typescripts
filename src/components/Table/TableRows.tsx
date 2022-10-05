import { IColumnsDefinitionType, KEY_TOOLS_TABLE } from '@/ultils/constants';
import Icon from '../Icon';
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
			className="border p-3 mb-5 hover:bg-slate-200 hover:font-semibold cursor-pointer"
		>
			{columns.map((column, index2) => {
				console.log('key', column.groupLabelTools);
				return column.key === KEY_TOOLS_TABLE.TOOLS ? (
					<div key={`cell-${index2}`} className="flex justify-end"></div>
				) : (
					<div key={`cell-${index2}`} className="truncate text-clip">
						{row[column.key]}
					</div>
				);
			})}
		</div>
	));

	return <div className="w-full h-[55vh] overflow-y-auto pr-3">{renderRowsData}</div>;
};

export default TableRows;
