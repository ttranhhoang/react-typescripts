import { JsxElement } from 'typescript';
import { IGetListUsers } from '@/interfaces/users/users.interface';
import { Control } from 'react-hook-form';

export interface IController {
	control?: Control<any, any>;
}

export const SEARCH_ALL_VALUE = ['00000000-0000-0000-0000-000000000000'];

export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

export const PAGE_SIZE = 10;
export interface IOption<T = string> {
	label: string;
	value: T;
}

/* ---------------------------------- TABLE --------------------------------- */
export interface IHeadersTable {
	name: string;
}
export enum KEY_TOOLS_TABLE {
	TOOLS = 'tools',
	INFO = 'info',
}

export enum ITABLE_ID_USER {
	USER_ID = 'USER_ID',
}
/* ----------------------------- ACCOUNTS_STATUS ---------------------------- */
export enum ACCOUNTS_STATUS {
	All = '00000000-0000-0000-0000-000000000000',
	Deactivated = '1',
	Activated = '2',
}
// export interface IColumnsDefinitionType<TData, K extends keyof TData | KEY_TOOLS_TABLE> {
// 	key: K;
// 	header: string;
// 	width?: number;
// 	groupLabelTools?: string[];
// }
export interface IColumnsDefinitionType<TData = any> {
	key: keyof TData | KEY_TOOLS_TABLE;
	header: string;
	groupLabelTools?: string[];
}

export interface ITableIConTools {
	key: number;
	icon: (data: any, tableId?: any) => React.ReactNode | JsxElement;
}

export const ORDER_USER: (keyof IGetListUsers)[] = [
	'accountStatus',
	'fullName',
	'email',
	'sentWelcomeEmail',
];

/* ---------------------------- OPTIONS COLLAPSE ---------------------------- */
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
