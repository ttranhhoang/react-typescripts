import { TOrderDirection } from '@/interfaces/users/users.interface';

// orderListForQuery<IGetListUsers>(ORDER_USER, keySortTable, direction),
export function orderListForQuery<T>(
	list: any[],
	firstPriority: keyof T,
	direction: TOrderDirection
) {
	return [...new Set([firstPriority, ...list])].reduce(
		(obj, value, index) =>
			index === 0 ? { ...obj, [value]: direction } : { ...obj, [value]: 'asc' },
		{}
	);
}
