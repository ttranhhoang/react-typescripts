import { IErrorResponse } from './../interfaces/common/common.interface';
import {
	useQuery as useQueryLib,
	useMutation as useMutationLib,
	QueryKey,
	QueryFunction,
	UseQueryOptions,
	UseQueryResult,
	MutationKey,
	UseMutationOptions,
	UseMutationResult,
} from 'react-query';
import { AxiosResponse } from 'axios';

export function useQuery<TData = any, TQueryFnData = any, TQueryKey extends QueryKey = QueryKey>(
	queryKey: TQueryKey,
	queryFn: QueryFunction<TQueryFnData, TQueryKey>,
	options?: Omit<
		UseQueryOptions<TQueryFnData, AxiosResponse<IErrorResponse>, AxiosResponse<TData>, TQueryKey>,
		'queryKey' | 'queryFn'
	>
): UseQueryResult<AxiosResponse<TData>, AxiosResponse<IErrorResponse>> {
	return useQueryLib(queryKey, queryFn, options);
}

export function useMutation<TData = any, TVariables = any, TContext = unknown>(
	mutationKey: MutationKey,
	mutationFn?: any,
	options?: Omit<
		UseMutationOptions<AxiosResponse<TData>, AxiosResponse<IErrorResponse>, TVariables, TContext>,
		'mutationKey' | 'mutationFn'
	>
): UseMutationResult<AxiosResponse<TData>, AxiosResponse<IErrorResponse>, TVariables, TContext> {
	return useMutationLib(mutationKey, mutationFn, options);
}
