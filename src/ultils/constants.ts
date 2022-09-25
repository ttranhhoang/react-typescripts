import { Control } from 'react-hook-form';

export interface IController {
	control?: Control<any, any>;
}

export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';
export interface IOption {
	value: string;
	label: string;
}
