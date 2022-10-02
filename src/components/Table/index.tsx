import { IGetListUsers } from '@/interfaces/users/users.interface';
import { IColumnsDefinitionType, IHeadersTable } from '@/ultils/constants';
import React from 'react';
import TableHeader from './TableHeader';
import TableRows from './TableRows';

interface ITable<T, K extends keyof T> {
	title: string;
	data: Array<T>;
	header?: [];
	columns: Array<IColumnsDefinitionType<T, K>>;
}

const Table = <T, K extends keyof T>(props: ITable<T, K>) => {
	const { title, data, header, columns } = props;
	// const renderHeaders = (header: IHeadersTable) => {};
	return (
		<div className="w-full h-full">
			<div className="bg-secondary uppercase text-dwhite p-2">{title}</div>
			{/* <div className="h-full">{renderHeaders(header)}</div> */}
			<TableHeader columns={columns} />
			<TableRows columns={columns} data={data} />
			<div className="h-full"></div>
		</div>
	);
};

export default Table;
