import { Control } from 'react-hook-form';

export interface IController {
	control?: Control<any, any>;
}

export const SEARCH_ALL_VALUE = ['00000000-0000-0000-0000-000000000000'];

export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
export interface IOption<T = string> {
	label: string;
	value: T;
}

export interface IHeadersTable {
	name: string;
}
export interface IColumnsDefinitionType<T, K extends keyof T> {
	key: K;
	header: string;
	width?: number;
}

export enum BOOLEAN_OPTIONS {
	all = '00000000-0000-0000-0000-000000000000',
	true = '1',
	false = '2',
}
export const IBooleanOptions: IOption[] = [
	{
		label: 'YES',
		value: BOOLEAN_OPTIONS.true,
	},
	{
		label: 'NO',
		value: BOOLEAN_OPTIONS.false,
	},
];
