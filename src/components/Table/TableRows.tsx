import { IColumnsDefinitionType } from '@/ultils/constants';
import React from 'react';
interface ITableRows<T, K extends keyof T> {
	columns: Array<IColumnsDefinitionType<T, K>>;
	data: Array<T>;
}
const TableRows = <T, K extends keyof T>(props: ITableRows<T, K>) => {
	const { columns, data } = props;
	const renderRowsData = data.map((row, index) => (
		<tr key={`row-${index}`}>
			{columns.map((column, index2) => {
				return (
					<td key={`cell-${index2}`}>
						<>{row[column.key]}</>
					</td>
				);
			})}
		</tr>
	));
	return <tbody>{renderRowsData}</tbody>;
};

export default TableRows;
