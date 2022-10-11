import { IColumnsDefinitionType } from '@/ultils/constants';
import TableHeader from './TableHeader';

interface ITable {
	title: string;
	data: any[];
	enableSort?: boolean;
	columns: Array<IColumnsDefinitionType>;
	actionButton?: React.ReactNode[];
	getSortValue?: (key: any) => void;
}

const Table = (props: ITable) => {
	const { title, data, columns, enableSort, actionButton, getSortValue } = props;
	return (
		<div className="w-full h-full">
			<div className="bg-secondary uppercase text-dwhite p-2 rounded-br-2xl relative">
				{title}
				{actionButton?.map((actionButton, index) => (
					<div
						key={index}
						className="absolute -top-6 cursor-pointer"
						style={{ right: `${index * 12}rem` }}
					>
						{actionButton}
					</div>
				))}
			</div>
			<TableHeader
				columns={columns}
				data={data}
				enableSort={enableSort}
				getSortValue={getSortValue}
			/>
		</div>
	);
};

export default Table;
