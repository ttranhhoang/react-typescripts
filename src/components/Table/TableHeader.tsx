import { IColumnsDefinitionType } from '@/ultils/constants';
import React from 'react';

interface ITableHeader<T, K extends keyof T> {
	columns: Array<IColumnsDefinitionType<T, K>>;
}
const TableHeader = <T, K extends keyof T>(props: ITableHeader<T, K>) => {
	const { columns } = props;
	const renderHeaders = columns.map((column, index) => <th key={index}>{column.header}</th>);
	return <thead>{renderHeaders}</thead>;
};

export default TableHeader;
