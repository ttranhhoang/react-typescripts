import { IColumnsDefinitionType } from '@/ultils/constants';
import TableHeader from './TableHeader';

interface ITable {
	title: string;
	data: any[];
	header?: [];
	columns: Array<IColumnsDefinitionType>;
}

const Table = (props: ITable) => {
	const { title, data, header, columns } = props;
	return (
		<div className="w-full h-full">
			<div className="bg-secondary uppercase text-dwhite p-2 rounded-br-2xl">{title}</div>
			<TableHeader columns={columns} data={data} />
		</div>
	);
};

export default Table;
